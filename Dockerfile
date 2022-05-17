FROM node:14.17.3-stretch-slim

WORKDIR /home

COPY . .

RUN npm install glob rimraf

RUN npm i

RUN npm i webpack

CMD ["npm", "start"]