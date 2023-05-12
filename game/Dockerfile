FROM node:20

WORKDIR /game

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4001

EXPOSE 4001

CMD ["npm", "run", "dev"]