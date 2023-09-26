FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/be-auth .

COPY package.json package-lock.json ./

# example flag --build-arg PORT=3000
ARG PORT

# if you need to access this version variable while the Docker container is running
# ENV PORT=$PORT

EXPOSE $PORT

RUN npm install --production

CMD node ./main.js


