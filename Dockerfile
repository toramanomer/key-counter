FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN rm -rf src

ENV NODE_ENV=production
ENV PORT=9000

EXPOSE ${PORT}

CMD ["node", "dist/main"]