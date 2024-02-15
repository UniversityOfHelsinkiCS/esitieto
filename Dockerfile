#Install and build the frontend
FROM registry.access.redhat.com/ubi8/nodejs-18:latest as frontend-builder

USER root 

WORKDIR /app/frontend
COPY ./frontend/package.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

#Install and build the backend
FROM registry.access.redhat.com/ubi8/nodejs-18:latest as backend-builder

USER root

WORKDIR /app/backend

COPY ./backend/package.json ./

RUN npm install

COPY --from=frontend-builder /app/frontend/dist /app/backend

COPY ./backend .

# Copy the dependencies into a Slim Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

# Install app dependencies
COPY --from=backend-builder /app/backend/node_modules /opt/app-root/src/node_modules
COPY ./backend /opt/app-root/src
COPY --from=frontend-builder /app/frontend/dist /opt/app-root/src/public

USER root 

RUN chmod -R 777 .

USER 1001

EXPOSE 3000

CMD ["npm", "run", "start"]