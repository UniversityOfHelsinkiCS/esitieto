FROM registry.access.redhat.com/ubi9/nodejs-18-minimal

WORKDIR /app

COPY . .

RUN npm ci --omit-dev --ignore-scripts

RUN npx vite build

EXPOSE 3000

CMD ["npm", "start"]
