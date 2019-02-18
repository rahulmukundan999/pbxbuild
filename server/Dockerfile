FROM node:8

WORKDIR /home/test/rahul/hire/pbxbuild

COPY package*.json ./

RUN npm install

copy . .

EXPOSE 3000


CMD [ "node", "app.js" ]