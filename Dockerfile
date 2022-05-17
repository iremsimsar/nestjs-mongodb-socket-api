FROM node:14.17.3-stretch-slim

WORKDIR /home

COPY . .

RUN cp -r .env.example .env

RUN npm install -g typescript 

RUN npm i -g @nestjs/cli 

RUN npm i

CMD ["npm", "start"]