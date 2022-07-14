FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN apt-get update
RUN apt-get install g++ make python3
RUN apt-get -y install python3-pip
RUN npm install
RUN npm install mediasoup@3.8.4

# Change this back prod
CMD ["npm", "start"]