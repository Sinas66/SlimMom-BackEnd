const errorHandler = (req, res, next) => {
    res.status(500).send('No such page');
    next();
};

module.exports = errorHandler