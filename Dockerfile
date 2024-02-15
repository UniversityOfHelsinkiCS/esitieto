#Install and build the frontend
FROM registry.access.redhat.com/ubi8/nodejs-18:latest as frontend-builder
WORKDIR /app/frontend
COPY ./frontend/package.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

#Install and build the backend
FROM registry.access.redhat.com/ubi8/nodejs-18:latest as backend-builder

WORKDIR /app/backend

COPY ./backend/package.json ./

RUN npm install

COPY --from=frontend-builder /app/frontend/dist /app/backend

COPY ./backend .

# Copy the dependencies into a Slim Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

# Install app dependencies
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY ./frontend /opt/app-root/src

USER root 

RUN chmod -R 777 .

USER 1001

EXPOSE 3000

CMD ["npm", "run", "start"]