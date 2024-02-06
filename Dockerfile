# Utiliza la imagen oficial de Node.js
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:14

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli