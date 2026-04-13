import { MicroAppItem } from '@/types/micro';

export const microAppList: MicroAppItem[] = [];

export function getMicroAppIndex(path: string) {
  return microAppList.findIndex((item) => path.startsWith(item.activeRule));
}

export function findMicroAppByPath(path: string): MicroAppItem | undefined {
  return microAppList.find((item) => path.startsWith(item.activeRule));
}

export function isMicroApp(path: string): boolean {
  return microAppList.some((item) => path.startsWith(item.activeRule));
}

export async function loadAppList(): Promise<void> {
  try {
    // 2. 发起请求
    const response = await fetch('/microApps.json');

    // 3. 检查请求是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 4. 使用 .json() 方法解析响应体
    const appList = await response.json();
    microAppList.push(...appList[process.env.NODE_ENV]);

    // 5. 返回解析后的数据
    return;
  } catch (error) {
    console.error('加载应用列表失败:', error);
    // 根据业务需求，可以返回空数组或抛出错误
    return;
  }
}

export function getMicroAppConfig(name: string): MicroAppItem | undefined {
  return microAppList.find((item) => item.name === name);
}
