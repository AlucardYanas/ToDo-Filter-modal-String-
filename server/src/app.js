const express = require('express');
const morgan = require('morgan');
const cardsRouter = require('./router/cardsrouter'); // Импортируем маршрутизатор для карт
const filterRouter = require('./router/filterRouter');
// Создаем Express
const app = express();

app.use(morgan('dev')); // Настраивает Morgan для логирования запросов в консоль в формате dev, который предоставляет краткую информацию о каждом запросе.
app.use(express.json()); // Парсинг JSON данных в теле запроса
app.use(express.urlencoded({ extended: true })); // Парсинг данных из HTML-форм

app.use('/api/cards', cardsRouter);
app.use('/api/filter', filterRouter);

// Экспортируем экземпляр
module.exports = app;