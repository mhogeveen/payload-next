FROM node:18.8.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir -p /app
WORKDIR /app

COPY sites/cms/*  .
COPY pnpm-lock.yaml .

# RUN apk add git

RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "serve" ]
