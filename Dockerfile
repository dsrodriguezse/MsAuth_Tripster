FROM node:20-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm", "start"]