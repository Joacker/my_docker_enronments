FROM node:15-alpine3.13

COPY . /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm","start"]