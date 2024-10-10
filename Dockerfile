# Étape 1: Construire l'application Angular
FROM node@sha256:5e4044ff6001d06e7748e35bfa4f80c73cf5f5a7360a1b782995e038a01b0585 AS build

WORKDIR /app/frontend

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances Node.js
RUN npm install

# Copier tous les fichiers sources du projet
COPY . .

# Générer le build de production
RUN npm run build --prod

# Étape 2: Servir avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis la phase précédente vers le dossier de Nginx
COPY --from=build /app/frontend/dist/test/browser /usr/share/nginx/html

# Ajuster les permissions pour que Nginx puisse accéder aux fichiers
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Commande de démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
