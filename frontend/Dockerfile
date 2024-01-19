FROM node:18-alpine3.16

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm run preview

CMD ["npm", "start"]
