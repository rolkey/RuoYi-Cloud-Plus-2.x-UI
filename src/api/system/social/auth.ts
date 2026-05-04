import request from '@/utils/request';
import { useServiceStore } from '@/store/modules/services';

const system = () => useServiceStore().servicePres.system;
const auth = () => useServiceStore().servicePres.auth;

// 获取跳转URL
export function authRouterUrl(source: string, tenantId: string) {
  return request({
    url: `/${auth()}/binding/${source}`,
    method: 'get',
    params: {
      tenantId: tenantId,
      domain: window.location.host
    }
  });
}

// 解绑账号
export function authUnlock(authId: string) {
  return request({
    url: `/${auth()}/unlock/${authId}`,
    method: 'delete'
  });
}

// 获取授权列表
export function getAuthList() {
  return request({
    url: `/${system()}/social/list`,
    method: 'get'
  });
}
