const jwt = require("jsonwebtoken");
const { secret } = require(`../../../config`);
const bcrypt = require("bcrypt");
const User = require("../../../db/schemas/user");

const login = (req, res) => {
    const user = req.body;
    console.log(`user: `, user);

    if (!user.userName) {
        sendError(`userName is required`); // Если нет userName то шлем ошибку
    }
    if (!user.password) {
        sendError(`Password is required`); // Если нет Password то шлем ошибку
    }

    const userNameReq = user.userName.trim().toLowerCase(); // Тримим и ловеркейсим userName
    const userPasswordReq = user.password.trim(); // Тримим и ловеркейсим userName

    const sendResponse = user => {
        res.json({
            status: "success",
            user
        });
    };

    function sendError(error) {
        let errMessage = "User doesnt exist";

        if (error) {
            errMessage = error;
        }
        res.status(400).json({
            err: errMessage
        });
    }

    const createToken = user => {
        const token = jwt.sign({ user, createdDate: Date.now() }, secret, {
            expiresIn: `30d`
        });
        return token;
    };

    const findUser = User.find({ userName: userNameReq });


    findUser
        .then(userFromDB => {
            if (userFromDB.length === 0) {
                throw "User doesnt exist"; //Если юзер не найдет кидаем ошибку
            }
            bcrypt
                .compare(userPasswordReq, userFromDB[0].password) //сравниваем пароли
                .then(res => {
                    if (!res) throw `Password is ivalid`;
                    return userFromDB[0];
                })
                .then(userFromDB => {
                    const newToken = createToken(userFromDB.id)
                    User.findByIdAndUpdate(userFromDB.id, { $set: { token: newToken } }, { new: true }, (err, doc) => {
                        if (err) throw err
                    })
                        .then(sendResponse)
                        .catch(sendError);
                })
                .catch(sendError);
        })
        .catch(sendError);
};

module.exports = login;
