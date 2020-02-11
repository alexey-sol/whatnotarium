# The file isn't used at the moment.

FROM node:12.8.1-alpine

WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY . .
