FROM node:14.17.0-alpine3.13

COPY . /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]