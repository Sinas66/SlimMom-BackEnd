const express = require('express');

const router = express.Router();
const { login, register, logout, updateUser, getUser } = require(`./user`);
const { createProducts, getProducts } = require(`../controllers/products`);
const checkBodyForUserNameAndPass = require(`../middleware/check-user-and-pas`);
const addFileToReq = require(`../middleware/addFileToReq`);
const authCheck = require(`../middleware/authCheck`);
// const calc = require(`./calc/calc`)

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
	.get(`/logout`, authCheck, logout)
	.put(`/user`, authCheck, updateUser)
	.get(`/user`, authCheck, getUser)
	// роут для калькулятора
	// .post(`/calc`, calc)

	// роут для обновления бд продуктов
	.post(`/products/file`, addFileToReq, createProducts)
	.get(`/products`, authCheck, getProducts)
	// .put(`/update-products`, null)
	// .get(`/products`, null)
	// .delete(`/delete-all-products`, null)
	// .delete(`/delete-one-products`, null)

	// если нет пути шлем ошибку
	.get(`*`, noSuchPageHandler);

module.exports = router;
