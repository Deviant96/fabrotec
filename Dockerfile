FROM ubuntu:latest

RUN sed -i 's/archive.ubuntu.com/kambing.ui.ac.id/g' /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y curl gnupg sqlite3 \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
