import request from '@/utils/request';

const base = '/resource/websocket';

// 订阅主题
export function subscribe(types: string[]) {
  return request({
    url: `${base}/subscribe`,
    method: 'post',
    data: types
  });
}

// 退订主题
export function unsubscribe(types: string[]) {
  return request({
    url: `${base}/unsubscribe`,
    method: 'post',
    data: types
  });
}

// 查询当前订阅列表
export function getSubscription() {
  return request({
    url: `${base}/subscription`,
    method: 'get'
  });
}
