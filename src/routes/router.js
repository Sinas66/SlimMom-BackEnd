const express = require('express');
const router = express.Router();
const { login, register, logout, updateUser } = require(`./`);
const { createProducts } = require(`./products`);
const {verifyOptions} = require(`../controllers/calculator.controller`);
const checkBodyForUserNameAndPass = require(`../middleware/check-user-and-pas`)
const addFileToReq = require(`../middleware/addFileToReq`)


const noSuchPageHandler = (req, res) => {
	res.end(`nooo`);
};

router
	.get(`/`, (req, res) => {
		res.end(`Basic api response`);
	})
	// роут для юзера
	.post(`/login`, checkBodyForUserNameAndPass, login)
	.post(`/register`, checkBodyForUserNameAndPass, register)
	.get(`/logout`, logout)
	.put(`/update-user/:id`, updateUser)
	// роут для калькулятора
	.post(`/calc`, verifyOptions)

	// роут для обновления бд продуктов
	.post(`/update-products`, addFileToReq, createProducts)
	// .put(`/update-products`, null)
	// .get(`/products`, null)
	// .delete(`/delete-all-products`, null)
	// .delete(`/delete-one-products`, null)

	// если нет пути шлем ошибку
	.get(`*`, noSuchPageHandler);

module.exports = router;
