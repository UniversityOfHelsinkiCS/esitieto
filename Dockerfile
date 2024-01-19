FROM node:14-alpine3.16

WORKDIR /frontend

RUN ls

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]
