const jwt = require("jsonwebtoken");
const { secret } = require(`../../../config`);
const bcrypt = require("bcrypt");
const User = require("../../../db/schemas/user");

const logout = (req, res) => {
  // проверяем токен
  // парсим токен, берем айди, удаляем по айди токен
  // или мидлвар который будет парсит токен, проверяет его и добавляет его в реквест если ок

  console.log(`req.user: `, req.user);
  // console.log(`req.user.token: `, !!req.user.token);

  if (!req.user) {
    sendError403(`no token(`);
    return;
  }

  const token = req.user.token.split(` `)[1];
  console.log(`token: `, token);

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

  function sendError403(err) {
    let errMessage = `You cant do that ;(`;
    if (err) {
      errMessage = err;
    }

    res.status(403).json({
      err: errMessage
    });
  }

  const isTokenValid = jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      if (err.message === "jwt expired") {
        sendError403(`Token expired`);
        return false;
      }
    }
    if (decoded === undefined) {
      sendError403(`Invalid token`);
      return false;
    }
    return true;
  });

  if (isTokenValid) {
    var decoded2 = jwt.decode(token);
    console.log(`decoded2: `, decoded2);
  }
};

module.exports = logout;
