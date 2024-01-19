FROM node:14-alpine3.16

COPY package* ./frontend

RUN ls

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]