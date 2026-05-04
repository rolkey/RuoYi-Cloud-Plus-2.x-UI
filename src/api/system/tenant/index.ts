import request from '@/utils/request';
import { TenantForm, TenantQuery, TenantVO } from './types';
import { AxiosPromise } from 'axios';
import { useServiceStore } from '@/store/modules/services';

const system = () => useServiceStore().servicePres.system;

// 查询医院列表
export function listTenant(query: TenantQuery): AxiosPromise<TenantVO[]> {
  return request({
    url: `/${system()}/tenant/list`,
    method: 'get',
    params: query
  });
}

// 查询医院详细
export function getTenant(id: string | number): AxiosPromise<TenantVO> {
  return request({
    url: `/${system()}/tenant/${id}`,
    method: 'get'
  });
}

// 新增医院
export function addTenant(data: TenantForm) {
  return request({
    url: `/${system()}/tenant`,
    method: 'post',
    headers: {
      isEncrypt: true,
      repeatSubmit: false
    },
    data: data
  });
}

// 修改医院
export function updateTenant(data: TenantForm) {
  return request({
    url: `/${system()}/tenant`,
    method: 'put',
    data: data
  });
}

// 医院状态修改
export function changeTenantStatus(id: string | number, tenantId: string | number, status: string) {
  const data = {
    id,
    tenantId,
    status
  };
  return request({
    url: `/${system()}/tenant/changeStatus`,
    method: 'put',
    data: data
  });
}

// 删除医院
export function delTenant(id: string | number | Array<string | number>) {
  return request({
    url: `/${system()}/tenant/${id}`,
    method: 'delete'
  });
}

// 动态切换医院
export function dynamicTenant(tenantId: string | number) {
  return request({
    url: `/${system()}/tenant/dynamic/${tenantId}`,
    method: 'get'
  });
}

// 清除动态医院
export function dynamicClear() {
  return request({
    url: `/${system()}/tenant/dynamic/clear`,
    method: 'get'
  });
}

// 同步医院套餐
export function syncTenantPackage(tenantId: string | number, packageId: string | number) {
  const data = {
    tenantId,
    packageId
  };
  return request({
    url: `/${system()}/tenant/syncTenantPackage`,
    method: 'get',
    params: data
  });
}

// 查询医院树
export function listTenantTree(): AxiosPromise<TenantVO[]> {
  return request({
    url: `/${system()}/tenant/tree`,
    method: 'get'
  });
}

// 同步租户字典
export function syncTenantDict() {
  return request({
    url: `/${system()}/tenant/syncTenantDict`,
    method: 'get'
  });
}

// 同步租户字典
export function syncTenantConfig() {
  return request({
    url: `/${system()}/tenant/syncTenantConfig`,
    method: 'get'
  });
}
