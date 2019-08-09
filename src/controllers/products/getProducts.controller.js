const Products = require(`../../model/products.model`);

const getProducts = (req, res) => {
	// const { userId } = req;
	const userGroupBlood = Number(req.params.groupBlood);
	console.log(userGroupBlood);

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
			err,
		});
	};

	Products.find()
		.then(products => {
			const newProducts = products.map(el => {
				return {
					...el._doc,
					value: el._doc._id,
					label: el._doc.title.ru,
					color:
						el._doc.groupBloodNotAllowed[userGroupBlood] === true
							? 'red'
							: 'black',
				};
			});
			return newProducts;
		})
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getProducts;
