FROM node:18.13.0

WORKDIR /var/www/orchestrator

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4000

CMD ["npx","nodemon","app.js"]