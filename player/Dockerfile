FROM node:20

WORKDIR /player

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4002

EXPOSE 4002
EXPOSE 444

CMD ["npm", "run", "dev"]