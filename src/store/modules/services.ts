import { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ServiceItem } from '@/types/service';

/**
 * 标签视图状态管理store
 * 用于管理页面标签、缓存和iframe视图
 */
export const useServiceStore = defineStore('service', () => {
  const servicePres = ref<ServiceItem>();

  const init = async (): Promise<void> => {
    try {
      // 2. 发起请求
      const response = await fetch('/service.json');

      // 3. 检查请求是否成功
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 4. 使用 .json() 方法解析响应体
      const appList = await response.json();
      servicePres.value = appList[process.env.NODE_ENV];

      // 5. 返回解析后的数据
      return;
    } catch (error) {
      console.error('加载服务接口失败:', error);
      // 根据业务需求，可以返回空数组或抛出错误
      return;
    }
  };

  return {
    servicePres,

    init
  };
});
