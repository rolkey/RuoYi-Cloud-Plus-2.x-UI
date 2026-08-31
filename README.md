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
scp ./dist.tar.gz db12_drg:/var/www/ && ssh db12_drg "cd /var/www && tar -xzf dist.tar.gz && rm -rf poct-8105 && mv dist poct-8105 && echo '部署完成。'"
scp ./dist.tar.gz al208a:/var/www/ && ssh al208a "cd /var/www && tar -xzf dist.tar.gz && rm -rf poct-8105 && mv dist poct-8105 && echo 'al208a部署完成。'"
```

## 添加类型定义自动生成

```bash
  Session   Typescript declaration generation configuration
  Continue  opencode -s ses_25f725e3effeq60QcYq0Nmyk3p
```

## 链接子项目的静态文件

- 注意：要在普通命令行上运行，不能在管理员模式下运行，也不能在powershell上运行，要在command中运行

```bash
mklink /J .\public\lis ..\..\work_code7\poct-ui-lis\public
mklink /J .\public\person ..\..\work_code7\poct-ui-person\public
mklink /J .\public\qc ..\..\work_code7\poct-ui-lis\public
```
