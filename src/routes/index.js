const login = require(`./user/login/login`)
const register = require('./user/register/register')
const logout = require('./user/logout/logout')
const updateUser = require(`./user/update/update`)


module.exports = {
    login,
    register,
    logout,
    updateUser,
}
