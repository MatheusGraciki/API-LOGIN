# syntax=docker/dockerfile:1
FROM node:12-alpine

WORKDIR /user/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "src/index.js"]

EXPOSE 3000
