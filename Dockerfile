FROM node 

WORKDIR /scraper-service

COPY package.json /scraper-service

COPY . .

ENV PORT 3001

EXPOSE $PORT

RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]