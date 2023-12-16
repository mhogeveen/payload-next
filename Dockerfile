FROM node:18.8.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY pnpm-lock.yaml .

RUN apk add git

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter cms build

FROM base
COPY --from=deps . .
COPY --from=build . .
EXPOSE 3000
CMD [ "pnpm", "--filter", "cms", "serve" ]
