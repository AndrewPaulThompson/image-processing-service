FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install --arch=x64 --platform=linux

CMD [ "npm", "run", "dev" ]
