FROM node:14

WORKDIR /src

COPY package*.json /

EXPOSE 3001

RUN npm install
RUN npm run build

COPY . /

CMD [ "npm", "run", "start" ]