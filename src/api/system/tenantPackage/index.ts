import request from '@/utils/request';
import { TenantPkgForm, TenantPkgQuery, TenantPkgVO } from './types';
import { AxiosPromise } from 'axios';
import { useServiceStore } from '@/store/modules/services';

const system = () => useServiceStore().servicePres.system;

// 查询医院套餐列表
export function listTenantPackage(query?: TenantPkgQuery): AxiosPromise<TenantPkgVO[]> {
  return request({
    url: `/${system()}/tenant/package/list`,
    method: 'get',
    params: query
  });
}

// 查询医院套餐下拉选列表
export function selectTenantPackage(): AxiosPromise<TenantPkgVO[]> {
  return request({
    url: `/${system()}/tenant/package/selectList`,
    method: 'get'
  });
}

// 查询医院套餐详细
export function getTenantPackage(packageId: string | number): AxiosPromise<TenantPkgVO> {
  return request({
    url: `/${system()}/tenant/package/${packageId}`,
    method: 'get'
  });
}

// 新增医院套餐
export function addTenantPackage(data: TenantPkgForm) {
  return request({
    url: `/${system()}/tenant/package`,
    method: 'post',
    data: data
  });
}

// 修改医院套餐
export function updateTenantPackage(data: TenantPkgForm) {
  return request({
    url: `/${system()}/tenant/package`,
    method: 'put',
    data: data
  });
}

// 医院套餐状态修改
export function changePackageStatus(packageId: number | string, status: string) {
  const data = {
    packageId,
    status
  };
  return request({
    url: `/${system()}/tenant/package/changeStatus`,
    method: 'put',
    data: data
  });
}

// 删除医院套餐
export function delTenantPackage(packageId: string | number | Array<string | number>) {
  return request({
    url: `/${system()}/tenant/package/${packageId}`,
    method: 'delete'
  });
}
