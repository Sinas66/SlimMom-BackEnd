const send404 = require('../../utils/send404')

const register = (req, res) => {
    if (0) {
        send404(req, res, `wow`)
    }

    res.json({ register: "ok" })
}

module.exports = register