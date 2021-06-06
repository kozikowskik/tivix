FROM node:14

WORKDIR /code

COPY package*.json ./

RUN npm install --only=prod

COPY . .

CMD [ "npm", "start" ]
