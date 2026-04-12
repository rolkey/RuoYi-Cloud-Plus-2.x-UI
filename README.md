## 前端运行

```bash
# 安装依赖
pnpm install --registry=https://registry.npmmirror.com

rm -rf node_modules pnpm-lock.yaml
npm cache clean --force
pnpm i
```
