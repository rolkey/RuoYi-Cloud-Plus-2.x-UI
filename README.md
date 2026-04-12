# 微前端子应用

## 前端运行

```bash
# 安装依赖
pnpm install --registry=https://registry.npmmirror.com

rm -rf node_modules pnpm-lock.yaml
npm cache clean --force
pnpm i

# 编译
rm -rf dist && rm -f dist.tar.gz && pnpm build:prod && tar -czf dist.tar.gz dist
```

## 升级服务器

```bash
# 部署drg测试虚拟机， 合并部署脚本：传输文件并在服务器端执行解压和替换操作
scp ./dist.tar.gz db12_drg:/var/www/ && ssh db12_drg "cd /var/www && tar -xzf dist.tar.gz && rm -rf poct-8105 && mv dist poct-8105 && echo '部署成功完成。'"
```
