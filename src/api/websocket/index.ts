import request from '@/utils/request';
import { useServiceStore } from '@/store/modules/services';

const resource = () => useServiceStore().servicePres.resource;

// 订阅主题
export function subscribe(types: string[]) {
  return request({
    url: `/${resource()}/websocket/subscribe`,
    method: 'post',
    data: types
  });
}

// 退订主题
export function unsubscribe(types: string[]) {
  return request({
    url: `/${resource()}/websocket/unsubscribe`,
    method: 'post',
    data: types
  });
}

// 查询当前订阅列表
export function getSubscription() {
  return request({
    url: `/${resource()}/websocket/subscription`,
    method: 'get'
  });
}
