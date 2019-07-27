const User = require('../../../db/schemas/user');
const bcrypt = require('bcrypt');

const register = (req, res) => {
    const user = req.body
    const hashedPassword = bcrypt.hashSync(user.password.trim(), 10);
    const userNameLower = user.userName.toLowerCase().trim()
    const userData = { ...user, password: hashedPassword, userName: userNameLower, userData: { email: '123@123.ru' } };
    const newUser = new User(userData);



    const sendResponse = user => {
        res.json({
            status: 'success',
            user
        });
    };


    const sendError = (error) => {
        let errMessage = 'user was not saved';
        console.log('user err', error);

        if (error && error.message && !error.code) {
            errMessage = error.message;
        } else if (error && error.code === 11000 && error.errmsg.includes('email')) {
            errMessage = 'email already exist';
        } else if (error && error.code === 11000 && error.errmsg.includes('userName')) {
            console.log(JSON.stringify(error));
            errMessage = 'userName already exist';
        }

        res.status(400).json({
            err: errMessage,
        });

    }

    newUser.save()
        .then(sendResponse)
        .catch(sendError)


}

module.exports = register