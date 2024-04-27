FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

#On peut prendre une image légère donc on prend node:18-alpine.
#Fichier de build dans lequel on récupère uniquement les packages nécessaires à faire un npm install
#On démarre notre conteneur sur l'host 0.0.0.0 pour qu'il écoute sur toutes les interfaces réseaux disponibles de notre hôte.