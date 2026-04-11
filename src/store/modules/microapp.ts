import type { MicroApp as MicroAppInstance } from 'qiankun';

interface MicroAppState {
  loadedMicroApps: Map<string, MicroAppInstance>;
}

export const useMicroAppStore = defineStore('microapp', {
  state: (): MicroAppState => ({
    loadedMicroApps: new Map(),
  }),
  actions: {
    setMicroApp(appId: string, microApp: MicroAppInstance) {
      this.loadedMicroApps.set(appId, microApp);
    },
    getMicroApp(appId: string): MicroAppInstance | undefined {
      return this.loadedMicroApps.get(appId);
    },
    removeMicroApp(appId: string) {
      this.loadedMicroApps.delete(appId);
    },
    hasMicroApp(appId: string): boolean {
      return this.loadedMicroApps.has(appId);
    },
  },
});

export default useMicroAppStore;
