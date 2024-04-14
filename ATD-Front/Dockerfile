FROM node:18-alpine AS build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]