import mitt, { Emitter } from 'mitt';
import request from '@/utils/request';
import { download } from '@/utils/request';
import { useUserStore } from '@/store/modules/user';
import { useAppStore } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { useSettingsStore } from '@/store/modules/settings';
import { useDictStore } from '@/store/modules/dict';
import { getToken } from '@/utils/auth';

interface MessageBusEvents {
  m_request: any;
  m_routeTo: string | { path: string };
  m_logout: void;
  m_token: string;
  m_modal: { method: string; title: string };
  [key: string]: any;
  [key: symbol]: any;
}

class MessageBus implements Emitter<MessageBusEvents> {
  private emitter = mitt<MessageBusEvents>();

  apiPath: string = import.meta.env.VITE_APP_BASE_API || '/prod-api';
  download = (url: string, params?: any, filename?: string) => download(url, params, filename);
  useAppStore = () => useAppStore();
  useUserStore = () => useUserStore();
  usePermissionStore = () => usePermissionStore();
  useDictStore = () => useDictStore();
  settingsStore = () => useSettingsStore();
  getToken = () => getToken();

  all = this.emitter.all;

  constructor() {
    this.initListeners();
  }

  private initListeners() {
    this.on('m_request', (data: any) => {
      request(data)
        .then((res) => {
          this.emit('c_response', { ...res, requestId: data.requestId });
        })
        .catch((error) => {
          this.emit('c_response_fail', { error, requestId: data.requestId });
        });
    });

    this.on('m_routeTo', (path: string | { path: string }) => {
      const router = (window as any).__VITE_ROUTER__;
      if (router) {
        router.replace(path);
      }
    });

    this.on('m_logout', async () => {
      try {
        await ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await useUserStore().logout();
        const router = (window as any).__VITE_ROUTER__;
        router?.replace({ path: '/login' });
      } catch {}
    });

    this.on('m_modal', (option: { method: string; title: string }) => {
      const modal = (window as any).__MODAL__;
      if (modal && modal[option.method]) {
        modal[option.method](option.title);
      }
    });
  }

  on(type: string, handler: any) {
    this.emitter.on(type as keyof MessageBusEvents, handler);
    return this;
  }

  off(type: string, handler: any) {
    this.emitter.off(type as keyof MessageBusEvents, handler);
    return this;
  }

  emit(type: string, data?: any) {
    this.emitter.emit(type as keyof MessageBusEvents, data);
    return this;
  }

  //   allType(type: keyof MessageBusEvents) {
  //     return this.emitter.allType(type);
  //   }
}

export const msgBus = new MessageBus();
export default msgBus;
