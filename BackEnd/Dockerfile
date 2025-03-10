FROM node:22.14.0

RUN apt-get update && apt-get install -y chromium

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
