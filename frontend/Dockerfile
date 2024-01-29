FROM registry.access.redhat.com/ubi9/nodejs-18-minimal

WORKDIR /app

COPY package*.json ./

USER root

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN chgrp -R root * && chmod -R 777 *

USER 1001

RUN npx vite build

EXPOSE 3000

CMD ["vite"]
