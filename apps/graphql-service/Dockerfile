FROM node:18-alpine3.16 

WORKDIR /usr/src/app

COPY ["tsconfig*.json","nest-cli.json","package.json","yarn.lock", "./"]

RUN yarn install --pure-lockfile --non-interactive

COPY apps/graphql-service ./apps/graphql-service
COPY apps/config.ts ./apps
COPY libs/dal ./libs/dal

RUN yarn build 

CMD ["node", "dist/apps/graphql-service/main.js"]
