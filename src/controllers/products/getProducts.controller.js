const Products = require(`../../model/products.model`);

const getProducts = (req, res) => {
	const { search } = req.query;
	const { user } = req;

	const sendResponse = products => {
		res.json({
			status: 'success',
			productsOptions: products,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;
		res.status(status).json({
			message: err.message,
			err,
		});
	};

	const formatRespAndCheckBlood = el => {
		let formatProduct = {
			value: el._id,
			label: el.title.ru,
			color: '#000',
		};
		if (user.userData) {
			const { groupBlood } = user.userData;
			formatProduct = {
				...formatProduct,
				color:
					el.groupBloodNotAllowed[String(groupBlood)] === true
						? '#f00'
						: '#0f0',
			};
		}
		return formatProduct;
	};

	const searchFilter = search
		? { 'title.ru': { $regex: search, $options: 'i' } }
		: null;

	Products.find(searchFilter)
		.lean()
		.then(products => products.map(formatRespAndCheckBlood))
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getProducts;
