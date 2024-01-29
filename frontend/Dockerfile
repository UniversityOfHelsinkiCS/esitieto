FROM registry.access.redhat.com/ubi9/nodejs-18-minimal

WORKDIR /app

COPY package*.json ./

USER root

RUN chgrp root * && chmod 660 *

USER 1001

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN npx vite build

EXPOSE 3000

CMD ["npm", "start"]
