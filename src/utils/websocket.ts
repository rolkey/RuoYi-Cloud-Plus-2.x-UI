import { getToken } from '@/utils/auth';
import { msgBus } from '@/micro/messageBus';

// 初始化socket
export const initWebSocket = (url: any) => {
  if (import.meta.env.VITE_APP_WEBSOCKET === 'false') {
    return;
  }
  const token = getToken();
  if (!token) {
    return;
  }
  url = url + '?Authorization=Bearer ' + token + '&clientid=' + import.meta.env.VITE_APP_CLIENT_ID;
  useWebSocket(url, {
    autoReconnect: {
      // 重连最大次数
      retries: 3,
      // 重连间隔
      delay: 1000,
      onFailed() {
        console.log('websocket重连失败');
      }
    },
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      // 发送心跳的间隔
      interval: 10000,
      // 接收到心跳response的超时时间
      pongTimeout: 2000
    },
    onConnected() {
      console.log('websocket已经连接');
      msgBus.emit('ws:connected');
    },
    onDisconnected() {
      console.log('websocket已经断开');
      msgBus.emit('ws:disconnected');
    },
    onMessage: (_, e) => {
      if (e.data.indexOf('ping') > 0) {
        return;
      }
      try {
        console.log('websocket收到消息', e.data);
        const msg = JSON.parse(e.data);
        if (msg && msg.type) {
          msgBus.emit('ws:' + msg.type, msg.data);
        }
      } catch (e) {
        // 忽略非 JSON 消息
        console.error(e);
      }
    }
  });
};
