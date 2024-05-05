FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine-slim
ADD ./default.conf /etc/nginx/conf.d
ADD ./fastcgi-php.conf /etc/nginx

COPY ./_.eautantdone.com_private_key.key /etc/nginx/ssl/_.eautantdone.com_private_key.key
COPY ./eautantdone.com_ssl_certificate.cer /etc/nginx/ssl/eautantdone.com_ssl_certificate.cer
COPY --from=build /app/dist /var/www/atd-front/
