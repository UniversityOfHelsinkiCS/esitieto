FROM registry.access.redhat.com/ubi9/nodejs-18:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Copy the dependencies into a Slim Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

# Install app dependencies
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src
COPY . ./

RUN chmod -R 777 *

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:staging"]