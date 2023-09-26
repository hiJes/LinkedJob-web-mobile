FROM node:18.13.0

WORKDIR /var/www/app
COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4002

CMD ["npx","nodemon","app.js"]