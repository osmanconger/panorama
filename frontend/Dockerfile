FROM node:latest

ADD . /app
WORKDIR /app

COPY package.json /app

RUN npm install

CMD ["npm", "start"]