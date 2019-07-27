const User = require('../../../db/schemas/user');
const { databaseUrl } = require('../../../config')

const updateUser = (req, res) => {
    const userUpdateData = req.body
    const id = req.params.id;

    console.log(`userUpdateData`, userUpdateData)
    console.log(`id`, id)



    const sendResponse = newUser => {
        res.json({
            status: `success`,
            newUser
        })
    }


    const sendError = () => {
        res.status(400).json({
            err: 'there is no such user'
        });
    };


    User.findById(id)
        .then(user => {
            // console.log("user", user)
            const updatedUser = { ...user._doc, ...userUpdateData }
            console.log("updatedUser", updatedUser)
            User.findByIdAndUpdate({ _id: id }, updatedUser)
                .then(sendResponse)
                .catch(err => console.log(err))
        })
        .catch(
            sendError
        )
}

module.exports = updateUser;
