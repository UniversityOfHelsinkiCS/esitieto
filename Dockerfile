FROM node:14-alpine3.16

WORKDIR /opt/app-root/frontend

COPY package* ./

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]
