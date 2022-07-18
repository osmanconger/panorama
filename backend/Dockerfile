FROM node:latest

ADD . /app
WORKDIR /app

COPY package.json /app

RUN npm install

# Change this back prod
CMD ["npm", "start"]