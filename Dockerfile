FROM node:15.4

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD npm run start:dev
