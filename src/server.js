const express = require(`express`);
const app = express();
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const errorHandler = require(`./utils/errorHandler`);
const router = require('./routes/router');

// const addTokenToReq = require(`./middleware/addTokentoReq`);

const staticPublicPath = path.join(__dirname, '../public');

const startServer = port => {
	app
		.use(cors())
		.use(helmet())
		.use(express.urlencoded({ extended: false })) // Добавляем query в url
		.use(express.json()) // Добавляем body в req
		.use(
			morgan(':method :url :status :res[content-length] - :response-time ms'),
		) // В консоле показывает действие
		.use(`/`, express.static(staticPublicPath)) // Возвращяет index.html и дает доступ к файлам
		// .use(addTokenToReq) // добавляет токен в req.user.token если он есть
		.use(`/api/v1`, router) // Путь для нашего роутера
		.use(errorHandler); // Отлавливаем ошибки сервера
	app.listen(port); // Порт на котором работает сервер

	console.log(`Server was started at http://localhost:${port}`);
};

module.exports = startServer;
