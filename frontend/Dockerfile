FROM registry.access.redhat.com/ubi9/nodejs-18-minimal

WORKDIR /app

COPY . .

RUN chmod -R 777 *

RUN npm ci

RUN npx vite build

EXPOSE 3000

CMD ["npm", "start"]
