FROM node:latest

WORKDIR /app

COPY . .

RUN chmod -R 777 *

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
