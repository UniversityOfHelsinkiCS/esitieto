FROM node:14-alpine3.16

RUN ls

COPY package* ./frontend

RUN npm ci --omit-dev --ignore-scripts

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]
