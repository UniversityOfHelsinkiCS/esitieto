FROM node:14-alpine3.16

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm run dev
