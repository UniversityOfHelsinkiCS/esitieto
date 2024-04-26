FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

ARG BASE_PATH
ARG DEPLOYMENT
ENV BASE_PATH=$BASE_PATH
ENV DEPLOYMENT=$DEPLOYMENT


WORKDIR /opt/app-root

# Install app dependencies
COPY package* ./
RUN npm ci --omit-dev --ignore-scripts
COPY . .

RUN npm run build

USER root 

RUN chmod -R 777 .

USER 1001

EXPOSE 3000

CMD ["npm", "run", "prod"]