FROM node:18.8.0-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY pnpm-lock.yaml .

RUN apk add git

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter cms build

EXPOSE 3000
CMD [ "pnpm", "--filter", "cms", "serve" ]
