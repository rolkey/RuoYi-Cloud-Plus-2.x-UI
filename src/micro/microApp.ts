import { loadMicroApp, MicroApp as MicroAppInstance } from 'qiankun';
import { findMicroAppByPath, type MicroAppItem } from './appList';
import msgBus from './messageBus';

const microApps: Map<string, MicroAppInstance> = new Map();

export interface MicroAppOptions {
  name: string;
  entry: string;
  container: string;
  props?: Record<string, any>;
}

export function createMicroApp(path: string, microId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const microAppInfo = findMicroAppByPath(path);
    if (!microAppInfo) {
      resolve();
      return;
    }

    const appId = `${microId}-${microAppInfo.name}`;

    if (microApps.has(appId)) {
      resolve();
      return;
    }

    setTimeout(() => {
      try {
        microAppInfo.container = '#' + appId;
        const microApp = loadMicroApp(
          {
            name: microAppInfo.name,
            entry: microAppInfo.entry,
            container: microAppInfo.container,
            props: {
              msgBus
            }
          },
          {
            sandbox: {
              experimentalStyleIsolation: true
            }
          }
        );

        microApps.set(appId, microApp);
        microApp.mountPromise
          .then(() => {
            resolve();
          })
          .catch(reject);
      } catch (err) {
        console.error('[MicroApp] Failed to create micro app:', err);
        reject(err);
      }
    }, 100);
  });
}

export function unmountMicroApp(microId: string, name: string) {
  const appId = `${microId}-${name}`;
  const microApp = microApps.get(appId);
  if (microApp) {
    microApp.unmount();
    microApps.delete(appId);
    console.log(`[MicroApp] ${appId} unmounted`);
  }
}

export function unmountAllMicroApps() {
  microApps.forEach((microApp, appId) => {
    microApp.unmount();
    console.log(`[MicroApp] ${appId} unmounted`);
  });
  microApps.clear();
}

export function getMicroApp(appId: string): MicroAppInstance | undefined {
  return microApps.get(appId);
}

export { microApps };
