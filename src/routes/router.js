const express = require('express');
const router = express.Router();
const { login, register, logout, updateUser } = require(`./`)


noSuchPageHandler = (req, res) => {
    res.end(`nooo`)

}
router.get(`/`, (req, res) => {
    res.end(`Basic api response`)
})
    //роут для юзера
    .post(`/login`, login)
    .post(`/register`, register)
    .get(`/logout`, logout)
    .put(`/update-user/:id`, updateUser)
    // если нет пути шлем ошибку
    .get(`*`, noSuchPageHandler)

module.exports = router;
