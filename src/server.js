const app = require(`./app/app`)
const express = require(`express`)
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path')
const errorHandler = require(`./utils/errorHandler`)
const favicon = require('serve-favicon');


const staticImagePath = path.join(__dirname, "../public")


const startServer = port => {

    app
        .use(cors())
        .use(express.urlencoded({ extended: false })) // Добавляем query в url
        .use(express.json()) // Добавляем body в req
        .use(morgan(':method :url :status :res[content-length] - :response-time ms')) // В консоле показывает действие
        .use(favicon(path.join(__dirname, '../public/images/favicon.ico'))) // Добавляем фавикон
        .use('/public', express.static(staticImagePath)) // Публичная папка
        .use(`/api/v1`, router) // Путь для нашего роутера
        .use(errorHandler); // Отлавливаем ошибки сервера
    app.listen(port); // Порт на котором работает сервер

    console.log('Server was started at http://localhost:' + port);
}

module.exports = startServer;
