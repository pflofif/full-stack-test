FROM node:18.20.4

# Налаштовуємо директорію в як докер буде дивтись і запускати наш код
WORKDIR /app

# Копіюємо package.json and package-lock.json
COPY package*.json ./

# Встановлюємо пакети в app
RUN npm install

# Копіюємо все в app
COPY . .

# Білдимо
RUN npm run build

# Даємо порт 5000 для бек енду
EXPOSE 5000

# Запускаємо
CMD ["npm", "start"]
