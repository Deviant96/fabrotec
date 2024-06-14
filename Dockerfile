FROM ubuntu:latest

# RUN sed -i 's/archive.ubuntu.com/mirror.biznetgio.com/g' /etc/apt/sources.list
RUN sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirror.biznetgio.com/ubuntu/|g' /etc/apt/sources.list \
    && sed -i 's@ports.ubuntu.com@mirror.biznetgio.com@g' /etc/apt/sources.list \
    && apt-get update -o Acquire::Queue-Mode=access \
    && apt-get install -y -o Dir::Cache::pkgcache="true" -o Dir::Cache::srcpackage="true" curl gnupg sqlite3 \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y -o Dir::Cache::pkgcache="true" -o Dir::Cache::srcpackage="true" nodejs \
    && npm install sqlite3 --save

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
