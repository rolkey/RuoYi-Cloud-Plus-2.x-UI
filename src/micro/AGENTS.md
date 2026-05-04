# micro/ — Qiankun Micro-Frontend Integration

**Micro-frontend host-shell pattern: `RuoYi-Cloud-Plus-UI` manages sub-app lifecycle.**

## FILES

| File | Role |
|------|------|
| `appList.ts` | Micro-app registry: `microAppList[]`, `loadAppList()` fetches from `/microApps.json`, `findMicroAppByPath()` |
| `microApp.ts` | Lifecycle: `createMicroApp()`, `unmountMicroApp()`, `unmountAllMicroApps()` |
| `messageBus.ts` | Cross-app event bus using `mitt` — exposed as `(window).__QIANKUN_MSG_BUS__` |
| `index.ts` | Re-exports: `msgBus`, `createMicroApp`, `unmountMicroApp`, `microAppList`, etc. |

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Sub-app registration | `appList.ts` — `loadAppList()` fetches JSON, `findMicroAppByPath()` |
| Sub-app lifecycle | `microApp.ts` — create, mount, unmount |
| Cross-app communication | `messageBus.ts` — mitt-based emit/on |

## NOTES

- `loadAppList()` fetches a JSON config at runtime (not static import) — enables dynamic sub-app discovery
- Message bus attached to `window.__QIANKUN_MSG_BUS__` for sub-app access
- App entry also sets `window.__VITE_ROUTER__` for sub-app route sync
- `RuoYi-Cloud-Plus-UI-Base` and `RuoYi-Cloud-Plus-UI-HIS` are registered sub-apps
