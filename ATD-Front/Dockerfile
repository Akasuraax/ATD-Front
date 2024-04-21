# Étape de construction
FROM node:18-alpine AS build
WORKDIR /app

# Copier les fichiers sources de l'application
COPY . .

# Installer les dépendances et construire l'application React
RUN npm install
RUN npm run dev

# Étape finale pour l'environnement de production
FROM node:18-alpine as production
WORKDIR /app

# Copier les fichiers construits de l'application React
COPY --from=build /app/build /app/build


