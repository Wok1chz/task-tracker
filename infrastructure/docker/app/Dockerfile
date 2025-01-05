# Базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY ../../app/package*.json ./
RUN npm install

# Копируем все файлы приложения
COPY app/ .

# Открываем порт для React dev-сервера
EXPOSE 3000

# Запуск React-приложения
CMD ["npm", "start"]