# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS dependencies
WORKDIR /workspace

COPY package.json package-lock.json* .npmrc ./
COPY app/package.json ./app/package.json

RUN if [ -f package-lock.json ]; then npm ci --workspaces --include-workspace-root; else npm install --workspaces --include-workspace-root; fi

FROM dependencies AS build
WORKDIR /workspace

COPY . .

ENV NODE_ENV=production
RUN npm run app:build

FROM nginx:1.27.5-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3   CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
