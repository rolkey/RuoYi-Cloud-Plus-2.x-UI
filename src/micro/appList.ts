export const microAppList: MicroAppItem[] = [
  {
    name: 'his',
    entry: import.meta.env.VITE_APP_QIANKUN_ENTRY_HIS || '//localhost:10301',
    activeRule: '/his',
    container: '#his'
  }
];

export interface MicroAppItem {
  name: string;
  entry: string;
  activeRule: string;
  container: string;
}

export function getMicroAppIndex(path: string) {
  let index = -1;
  microAppList.forEach((item, itemIndex) => {
    if (path.startsWith(item.activeRule)) index = itemIndex;
  });
  return index;
}

export function findMicroAppByPath(path: string): MicroAppItem | undefined {
  return microAppList.find((item) => path.startsWith(item.activeRule));
}

export function isMicroApp(path: string): boolean {
  return microAppList.some((item) => path.startsWith(item.activeRule));
}

export function getMicroAppConfig(name: string): MicroAppItem | undefined {
  return microAppList.find((item) => item.name === name);
}
