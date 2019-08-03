const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		err,
		message: 'something goes wrong! server handleError'
	})
	next();
};

module.exports = errorHandler;
