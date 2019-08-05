const login = require(`./login`);
const register = require('./register');
const logout = require('./logout');

const auth = require(`./auth.controller`);
const getUser = require(`./get-user`);
const updateUser = require(`./update-user`);

module.exports = {
	auth,
	login,
	register,
	logout,
	updateUser,
	getUser,
};
