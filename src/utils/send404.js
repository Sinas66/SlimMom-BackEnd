const send404 = (req, res, message) => {
    res.status(404).json({ err: message })
}
module.exports = send404;
