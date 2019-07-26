const express = require('express');
const router = express.Router();
const { login, register, logout } = require(`./`)


noSuchPageHandler = (req, res) => {
    res.end(`nooo`)

}
router.get(`/`, (req, res) => {
    res.end(`Basic api response`)
})
    .post(`/login`, login)
    .post(`/register`, register)
    .get(`/logout`, logout)
    .get(`*`, noSuchPageHandler)

module.exports = router;
