FROM node:latest

WORKDIR /app

COPY . .

RUN chmod -R 777 *

RUN npm install

RUN npx vite build

EXPOSE 3000

CMD ["npm", "start"]
