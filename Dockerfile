FROM node:14

WORKDIR /src

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]