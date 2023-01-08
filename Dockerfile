FROM node 

WORKDIR /scraper-service

COPY package.json /scraper-service

COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]