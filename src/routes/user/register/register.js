const User = require("../../../db/schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require(`../../../config`);

const register = (req, res) => {
  const user = req.body;

  if (!user.password) {
    sendError(`Password is required`);
  }

  const hashedPassword = bcrypt.hashSync(user.password.trim(), 10);
  const userNameLower = user.userName

  // const createToken = user => {
  //   const token = jwt.sign({ user, createdDate: Date.now() }, secret, {
  //     expiresIn: `30d`
  //   });
  //   return token;
  // };

  const newUserData = {
    ...user,
    password: hashedPassword,
    userName: userNameLower
  };

  const newUser = new User(newUserData);

  const userId = newUser._id
  newUser.token = jwt.sign({ userId, createdDate: Date.now() }, secret, {
    expiresIn: `30d`
  });

  const sendResponse = user => {
    res.json({
      status: "success",
      user
    });
  };

  function sendError(error) {
    let errMessage = "user was not saved";
    console.log("user err", error);
    if (error === `Password is required`) {
      errMessage = error;
    }
    if (error && error.message && !error.code) {
      errMessage = error.message;
    } else if (
      error &&
      error.code === 11000 &&
      error.errmsg.includes("email")
    ) {
      errMessage = "email already exist";
    } else if (
      error &&
      error.code === 11000 &&
      error.errmsg.includes("userName")
    ) {
      console.log(JSON.stringify(error));
      errMessage = "userName already exist";
    }

    res.status(400).json({
      err: errMessage
    });
  }
  newUser
    .save()
    .then(sendResponse)
    .catch(sendError);

};

module.exports = register;
