#jkhdsakjhfd
FROM node:latest AS build
#jkhdsakjhfd
WORKDIR /app
#jkhdsakjhfd
COPY package*.json ./
#jkhdsakjhfd
RUN npm ci
#jkhdsakjhfd
COPY . .
#jkhdsakjhfd
RUN npm run build --prod
#jkhdsakjhfd
FROM nginx:alpine
#jkhdsakjhfd
COPY  --from=build  /app/dist/ecomgame/browser /usr/share/nginx/html
# Verificar si el archivo index.csr.html existe y renombrarlo a index.html
RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi
#jkhdsakjhfd
EXPOSE 80
#jkhdsakjhfd
CMD ["nginx", "-g", "daemon off;"]
