FROM node:erbium-alpine AS development
ENTRYPOINT [ "yarn", "dev" ]
ARG NODE_ENV=development
ENV NODE_ENV=development
WORKDIR /opt/app

COPY package.json yarn.loc[k] ./
RUN yarn install --verbose
COPY . ./



FROM node:erbium-alpine AS production
ENTRYPOINT [ "yarn", "start" ]
ARG NODE_ENV=production
ENV NODE_ENV=production
WORKDIR /opt/app

COPY package.json yarn.loc[k] ./
RUN yarn install --verbose
COPY . ./
