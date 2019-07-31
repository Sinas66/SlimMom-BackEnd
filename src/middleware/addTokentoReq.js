const addTokenToReq = (req, res, next) => {
	if (req.headers.authorization) {
		req.user = { ...req.user, token: req.headers.authorization };
	}
	next();
};

module.exports = addTokenToReq;
