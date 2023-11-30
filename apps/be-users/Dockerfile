FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/be-users .

COPY package*.json ./


ENV PORT=3050

EXPOSE ${PORT}

RUN npm install --production

CMD ["node", "main.js"]