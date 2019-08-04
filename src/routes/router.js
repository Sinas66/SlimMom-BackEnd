const express = require('express');

const {
	checkBodyForUserNameAndPass,
	addFileToReq,
	authCheck,
	checkCalcReq,
} = require(`../middleware`);
const router = express.Router();
const {
	login,
	register,
	logout,
	updateUser,
	getUser,
} = require('../controllers/user');

const calculator = require(`../controllers/calculator.controller`);

const { createProducts, getProducts } = require('../controllers/products');
const userEated = require('../controllers/userEated');

const noSuchPageHandler = (req, res) => {
	res.status(404).json({
		err: true,
		message: 'No such route',
	});
};

router
	.get('/', (req, res) => {
		res.end('Basic api response');
	})
	// роут для юзера
	.post('/login', checkBodyForUserNameAndPass, login)
	.post('/register', checkBodyForUserNameAndPass, register)
	.get('/logout', authCheck, logout)
	.put('/user', authCheck, updateUser)
	.get('/user', authCheck, getUser)
	// роут для калькулятора
	.post('/calc', checkCalcReq, calculator)

	// роут для обновления бд продуктов
	.post('/products/file', addFileToReq, createProducts)
	.get('/products', authCheck, getProducts)
	// .put('/update-products', null)
	// .get('/products', null)
	// .delete('/delete-all-products', null)
	// .delete('/delete-one-products', null)
	// ? Записати що юзер з'їв і вернути новий документ
	.post('/user/eat/:productId', authCheck, userEated.createUserEated)
	//! Видалити що юзер з'їв - видалити документ по ід
	.delete('user/eat/:productId', authCheck, userEated.deleteUserEated)
	// если нет пути шлем ошибку
	.get('*', noSuchPageHandler);

module.exports = router;
