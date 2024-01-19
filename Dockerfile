FROM node:14-alpine3.16

WORKDIR /app/frontend

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "dev"]
