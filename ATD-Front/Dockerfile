FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]