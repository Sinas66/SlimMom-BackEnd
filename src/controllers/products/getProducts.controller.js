const Products = require(`../../model/products.model`);

const getProducts = (req, res) => {
	// const userGroupBlood = Number(req.params.groupBlood);
	// console.log(userGroupBlood);
	const { search } = req.query;
	// console.log({ search });
	// encodeURIComponent()
	const { user } = req;
	// console.log(user);

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

	if (search) {
		Products.find({ 'title.ru': { $regex: search, $options: 'i' } })
			.lean()
			.then(products => {
				const newProducts = products.map(el => {
					if (user.userData.groupBlood) {
						const { groupBlood } = user.userData;
						return {
							value: el._id,
							label: el.title.ru,
							color:
								el.groupBloodNotAllowed[String(groupBlood)] === true
									? '#f00'
									: '#0f0',
						};
					}
					return {
						value: el._id,
						label: el.title.ru,
						color: '#000',
					};
				});
				return newProducts;
			})
			.then(sendResponse)
			.catch(sendError);
	} else {
		Products.find()
			.lean()
			.then(products => {
				const newProducts = products.map(el => {
					if (user.userData.groupBlood) {
						const { groupBlood } = user.userData;
						return {
							value: el._id,
							label: el.title.ru,
							color:
								el.groupBloodNotAllowed[String(groupBlood)] === true
									? '#f00'
									: '#0f0',
						};
					}
					return {
						value: el._id,
						label: el.title.ru,
						color: '#000',
					};
				});
				return newProducts;
			})
			.then(sendResponse)
			.catch(sendError);
	}
};

module.exports = getProducts;
