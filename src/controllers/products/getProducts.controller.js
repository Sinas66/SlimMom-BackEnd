const Products = require(`../../model/products.model`);

const getProducts = (req, res) => {
	const sendResponse = products => {
		res.json({
			status: 'success',
			products,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;
		res.status(status).json({
			message: err.message,
			err: err,
		});
	};

	Products.find()
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getProducts;
