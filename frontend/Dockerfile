FROM registry.access.redhat.com/ubi9/nodejs-18:latest

WORKDIR /app

COPY package*.json ./

USER root

RUN npm ci --omit-dev --ignore-scripts

COPY . ./

RUN chmod -R 777 *

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:staging"]