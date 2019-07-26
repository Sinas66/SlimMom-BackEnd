const send404 = require('../../utils/send404')

const login = (req, res) => {
    const user = req.body
    console.log(user)

    if (!user.login) {
        send404(req, res, `Login is required`)
    }
    if (!user.password) {
        send404(req, res, `Password is required`)
    }

    res.json({
        status: "ok",
        user: user
    })
}

module.exports = login