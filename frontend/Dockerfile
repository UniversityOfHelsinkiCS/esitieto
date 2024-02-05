FROM registry.access.redhat.com/ubi9/nodejs-18-minimal

WORKDIR /app

COPY package*.json ./

USER root

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN chgrp -R root * && chmod -R 777 *

USER 1001

RUN npm run build

FROM nginx:1.25.0-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]