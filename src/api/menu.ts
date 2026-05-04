import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RouteRecordRaw } from 'vue-router';
import { useServiceStore } from '@/store/modules/services';

const system = () => useServiceStore().servicePres.system;

// 获取路由
export function getRouters(): AxiosPromise<RouteRecordRaw[]> {
  return request({
    url: `/${system()}/menu/getRouters`,
    method: 'get'
  });
}
