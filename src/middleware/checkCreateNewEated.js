const checkCreateNewEated = (req, res, next) => {
	const userProductSelected = req.params.productId;
	const userProductWeight = req.body.weight;
	const userDateSelected = req.body.date;

	const sendError = err => {
		res.status(400).json({
			status: 'error',
			message: err,
			example: {
				weight: 20,
				date: 213213123,
			},
		});
	};
	if (req.headers[`content-type`] !== `application/json`) {
		sendError('request content-type must be application/json only'); // Пропускаем только json
		return;
	}
	if (!userProductSelected) {
		sendError('Productid is required as query');
		return;
	}
	if (!userProductWeight) {
		sendError('Eated product weight is required ');
		return;
	}
	if (!userDateSelected) {
		sendError('Eated date is required');
		return;
	}

	next();
};

module.exports = checkCreateNewEated;
