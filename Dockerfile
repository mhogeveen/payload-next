FROM node:18.8.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY pnpm-lock.yaml .

RUN apk add git

RUN pnpm install

COPY . .

RUN pnpm --filter cms build

EXPOSE 3000
CMD [ "pnpm", "--filter", "cms", "serve" ]
