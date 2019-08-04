const login = require(`./login`);
const register = require('./register');
const logout = require('./logout');
const getUser = require(`./get-user`);
const updateUser = require(`./update-user`);

module.exports = {
	login,
	register,
	logout,
	updateUser,
	getUser,
};
