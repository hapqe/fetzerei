FROM node:20

WORKDIR /game

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4001

EXPOSE 4001

# npm run dev
CMD ["npm", "run", "dev"]