FROM node:14-alpine3.16

WORKDIR /app/frontend

COPY package* ./frontend

RUN ls frontend

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]
