FROM node:latest

ADD . /app
WORKDIR /app

COPY package.json /app

RUN apt-get update
RUN apt-get install g++ make python3
RUN apt-get -y install python3-pip
RUN npm install

CMD ["npm", "start"]