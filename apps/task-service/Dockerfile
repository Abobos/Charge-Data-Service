FROM node:18-alpine3.16 

WORKDIR /usr/src/app

COPY ["tsconfig*.json","nest-cli.json","package.json","yarn.lock", "./"]

RUN yarn install --pure-lockfile --non-interactive

COPY apps/task-service ./apps/task-service
COPY apps/config.ts ./apps
COPY libs/dal ./libs/dal

RUN yarn build task-service

CMD ["node", "dist/apps/task-service/main.js"]
