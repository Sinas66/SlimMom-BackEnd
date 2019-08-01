const express = require('express');
const router = express.Router();
const multer = require('multer');
const { login, register, logout, updateUser } = require(`./`);
const { createProducts } = require(`./products`);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/')
},
	filename(req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

const noSuchPageHandler = (req, res) => {
	res.end(`nooo`);
};

router
	.get(`/`, (req, res) => {
		res.end(`Basic api response`);
	})
	// роут для юзера
	.post(`/login`, login)
	.post(`/register`, register)
	.get(`/logout`, logout)
	.put(`/update-user/:id`, updateUser)
	// роут для калькулятора
	// .put(`/calc`, null)

	// роут для обновления бд продуктов
	.post(`/update-products`, upload.single('file'), createProducts)
	// .put(`/update-products`, null)
	// .get(`/products`, null)
	// .delete(`/delete-all-products`, null)
	// .delete(`/delete-one-products`, null)

	// если нет пути шлем ошибку
	.get(`*`, noSuchPageHandler);

module.exports = router;
