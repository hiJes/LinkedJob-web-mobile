FROM node:18.13.0

WORKDIR /var/www/users

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4001

CMD ["npx","nodemon","app.js"]