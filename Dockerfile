# Etapa de construcción usando Node.js v18.20.5
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente del proyecto
COPY . .

# Construir la aplicación en modo producción
RUN npm run build --prod

# Etapa de producción usando Nginx
FROM nginx:alpine

# Copiar los archivos generados por Angular desde la etapa de construcción
COPY --from=build /app/dist/ecomgame/browser /usr/share/nginx/html

# Verificar si el archivo index.csr.html existe y renombrarlo a index.html
RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
