# Use a imagem oficial do Node.js como imagem base
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo para produção
RUN npm run build

# Use uma imagem de servidor web para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos estáticos do diretório de build para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta 80 para o contêiner
EXPOSE 3030

# Comando para rodar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
