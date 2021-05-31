FROM node:14

WORKDIR /code

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm install

COPY . .

CMD [ "npm", "start" ]
