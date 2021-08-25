FROM node:14.15.5


WORKDIR /home/api

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start:dev