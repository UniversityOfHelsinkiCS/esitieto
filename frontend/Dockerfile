FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

run npm run build

EXPOSE 3000

CMD ["npm", "start"]
