# Pobierz oficjalne obrazu Node.js w wersji 16
FROM node:16

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do kontenera
COPY package*.json ./

# Zainstaluj zależności aplikacji
RUN npm install

# Skopiuj resztę plików aplikacji do kontenera
COPY . .

# Zbuduj aplikację
RUN npm run build

# Ustaw port na którym aplikacja będzie nasłuchiwać
EXPOSE 8080

# Uruchom serwer
CMD ["npm", "run", "serve"]
