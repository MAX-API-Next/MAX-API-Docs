# MAX API Docs

[English](./README.md) | **简体中文**

MAX API 的 Next.js 文档站点。

## 安装 Bun

本项目使用 Bun 安装依赖和执行开发、构建脚本。项目的 Docker 构建当前使用 Bun 1.3.14，本地开发建议使用 Bun 1.3.14 或更新的兼容版本。

### Linux 和 macOS

```bash
curl -fsSL https://bun.sh/install | bash
```

安装完成后，重新打开终端，或者根据当前 Shell 重新加载配置：

```bash
# Bash
source ~/.bashrc

# Zsh
source ~/.zshrc
```

### Windows PowerShell

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

安装完成后重新打开 PowerShell。使用 WSL 时，请在 WSL 终端中执行前面的 Linux 安装命令。

### macOS Homebrew

也可以通过 Homebrew 安装：

```bash
brew tap oven-sh/bun
brew install bun
```

安装后检查 Bun 是否可用：

```bash
bun --version
```

如果使用 Docker Compose 部署，则宿主机不需要单独安装 Bun，`Dockerfile` 会在镜像构建阶段提供所需的 Bun 环境。

## 本地开发

安装依赖并启动开发服务器：

```bash
bun install
bun dev
```

浏览器访问 http://localhost:33301 查看站点。

## 生产构建

```bash
bun run build
```

## 使用 Docker 部署

项目提供了多阶段 Docker 镜像，并参考 MAX API 的生产部署方式拆分构建阶段和运行阶段。运行镜像采用 Node 22 Alpine、非 root 用户、固定容器端口、健康检查和自动重启策略。文档服务本身不需要 PostgreSQL 或 Redis。

### 1. 配置容器

```bash
cp .env.docker.example .env.docker
```

编辑 `.env.docker`，至少设置对外访问地址：

```env
DOCS_PORT=33301
NEXT_PUBLIC_SITE_URL=https://docs.your-domain.com

# 可选：启用 Ask AI 助手
INKEEP_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=https://your-max-api-domain/v1
```

`INKEEP_API_KEY` 只会在容器启动时作为运行时环境变量注入，不会作为 Docker 构建参数，也不会写入镜像层。`.env.docker` 已被 `.gitignore` 和 `.dockerignore` 排除，请勿提交或上传该文件。

需要注意，拥有服务器 root 权限或 Docker 管理权限的用户仍可通过 `docker inspect` 查看容器运行时环境变量。如需更严格的隔离，应改用 Docker Secrets 或外部密钥管理服务。

### 2. 构建并启动

```bash
docker compose --env-file .env.docker build
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker ps
```

默认访问地址：

```text
http://127.0.0.1:33301
```

查看日志和健康状态：

```bash
docker compose --env-file .env.docker logs -f max-api-docs
docker inspect --format='{{json .State.Health}}' max-api-docs
```

拉取新代码后，重新构建并替换容器：

```bash
git pull
docker compose --env-file .env.docker up -d --build
```

修改 `NEXT_PUBLIC_SITE_URL` 或 `NEXT_PUBLIC_GA_ID` 后必须重新构建镜像，因为 Next.js 会在构建阶段嵌入公开环境变量。修改 `INKEEP_API_KEY`、`AI_MODEL` 或 `AI_BASE_URL` 后只需重新创建容器。

### 3. Linux 构建报错排查

如果执行以下命令：

```bash
docker compose --env-file .env.docker build
```

在 `RUN bun run build` 阶段出现以下错误：

```text
$ tsx scripts/prebuild.ts
error: Cannot find module './cjs/index.cjs' from ''
error: script "prebuild" exited with code 1
```

这是 Bun 1.3.14 在 Linux 中执行 `tsx` CLI 时触发的模块解析兼容问题。项目已改为由 Bun 直接执行 TypeScript 预构建脚本。更新代码后，先确认 `package.json` 中的脚本为：

```json
"prebuild": "bun scripts/prebuild.ts"
```

然后清除旧的镜像构建缓存并重新构建：

```bash
git pull
docker compose --env-file .env.docker build --no-cache
```

构建成功后启动容器并检查状态：

```bash
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker ps
docker compose --env-file .env.docker logs --tail=100 max-api-docs
```

`ps` 输出中的服务状态应为 `running` 或 `healthy`。如果仍然看到 `$ tsx scripts/prebuild.ts`，说明服务器使用的还是旧代码，请重新确认当前分支、最新提交以及 `package.json` 的实际内容。

### 4. 直接使用已发布镜像

镜像发布到仓库后，可将 `docker-compose.yml` 中的 `image: max-api-docs:local` 替换为实际镜像地址，并删除 `build` 配置。容器内部始终监听 `33301` 端口。

## 不使用 Docker 部署到 VPS

本项目包含 `/api/chat`、`/api/search` 等服务端路由，因此执行 `bun run build` 后仍需作为 Node/Bun 服务持续运行，不能只上传 `.next` 目录作为静态网站。

### 1. 准备项目

```bash
cd /opt
git clone <your-repository-url> max-api-docs
cd max-api-docs

bun install
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_SITE_URL=https://docs.your-domain.com

# 可选：启用 Ask AI 助手
INKEEP_API_KEY=your_api_key
AI_MODEL=your_model_name
AI_BASE_URL=https://your-max-api-domain/v1
```

`.env.local` 已被 `.gitignore` 排除。请勿将其提交到 Git 仓库或上传到公开位置。

### 2. 构建并运行

```bash
bun run build
bun run start
```

当前 `start` 脚本监听 `33301` 端口：

```text
http://127.0.0.1:33301
```

生产环境可使用 PM2 保持服务运行：

```bash
npm i -g pm2
pm2 start "bun run start" --name max-api-docs
pm2 save
pm2 startup
```

### 3. 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name docs.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:33301;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

修改 `.env.local` 后，需要重启运行中的服务，让 Next.js 重新读取环境变量。

## 项目结构

| 路径                          | 说明                         |
| ----------------------------- | ---------------------------- |
| `src/app/[lang]/(home)`       | 多语言主页                   |
| `src/app/[lang]/docs`         | 多语言文档页面               |
| `src/app/api/search/route.ts` | 文档搜索接口                 |
| `src/app/api/chat/route.ts`   | Ask AI 助手接口              |
| `content/docs/`               | MDX 文档内容                 |
| `src/lib/source.ts`           | Fumadocs 文档数据源配置      |
| `Dockerfile`                  | 多阶段生产镜像               |
| `docker-compose.yml`          | 容器启动、健康检查和端口配置 |

## 相关资料

- [Next.js 文档](https://nextjs.org/docs)
