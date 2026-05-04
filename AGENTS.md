# RuoYi-Cloud-Plus-UI

**Main micro-frontend shell (port 80) — qiankun host app for the admin system.**

## STRUCTURE

```
src/
├── main.ts               # App entry: mounts Vue, registers plugins, loads micro apps
├── App.vue                # Root component with <router-view>
├── permission.ts          # Route guard: token check, user info fetch, dynamic routes
├── settings.ts            # App settings (theme, layout, tagsView)
├── api/                   # Axios API layer (system, monitor, tool, workflow)
├── components/            # 23 shared components (Pagination, FileUpload, QianKun, etc.)
├── layout/                # App shell layout (Sidebar, Navbar, TagsView, Settings)
├── micro/                 # Qiankun micro-frontend integration (appList, messageBus)
├── router/                # Vue Router (static + dynamic routes)
├── store/                 # 9 Pinia modules (app, user, permission, tagsView, etc.)
├── views/                 # Page views (system, monitor, workflow, tool, demo)
├── hooks/                 # useDialog (composition API)
├── directive/             # Custom directives (permission, common)
├── plugins/               # Plugin registration (auth, cache, download, modal, tab)
├── utils/                 # 19 utilities (request, auth, dict, i18n, crypto, SSE, WebSocket)
├── lang/                  # i18n (zh_CN, en_US)
├── enums/                 # LanguageEnum, MenuTypeEnum, RespEnum, SideThemeEnum
└── types/                 # TS type definitions (10 .d.ts files)
```

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Micro-frontend config | `src/micro/` (see AGENTS.md in micro/) |
| Route guard | `src/permission.ts` |
| API requests | `src/api/` (axios wrapper in `src/utils/request.ts`) |
| Auth stores | `src/store/modules/user.ts`, `permission.ts` |
| Layout shell | `src/layout/` |
| System admin pages | `src/views/system/` (user, role, dept, menu, config, etc.) |

## CONVENTIONS

- Vue 3 Composition API (`<script setup lang="ts">`)
- Pinia stores with `defineStore` + arrow functions
- API modules: one `.ts` file per domain, export functions, not classes
- Views organized by feature under `views/` — mirror backend module names
- UnoCSS utility classes over scoped CSS; SCSS for global styles
- Element Plus components with `v-loading`, `el-table`, `el-pagination`
- Route meta: `title`, `icon`, `affix`, `noCache` properties

## ANTI-PATTERNS

- `dist/` + `dist.tar.gz` committed in git
- `node_modules/` committed in git
- Some commented-out code in `main.ts` (highlight.js style import)
- Hardcoded `/microApps.json` fetch URL in `src/micro/appList.ts`
- `pnpm-lock.yaml` ignored by `.gitignore` but still committed (pre-dates rule)
- `vite serve` in package.json scripts is deprecated — should be `vite`
- Stale `bin/*.bat` scripts reference `yarn` but project uses `pnpm`
- Vitest 3.2.4 in devDeps but no test script or vitest config
