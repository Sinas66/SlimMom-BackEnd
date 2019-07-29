const jwt = require("jsonwebtoken");
const { secret } = require(`../../../config`);
const bcrypt = require("bcrypt");
const User = require("../../../db/schemas/user");

const logout = (req, res) => {
  if (!req.user) {
    sendError403(`no token(`); // Если нет токена то шлем ошибку
    return;
  }

  const token = req.user.token.split(` `)[1]; // Парсим сам токен

  const sendResponse = user => {
    res.json({
      status: "success"
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
      }else {
        sendError403(err);
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
    const userId = jwt.decode(token).userId;
    User.findByIdAndUpdate(userId, { $unset: { token: `` } }, { new: true })
      .then(sendResponse)
      .catch(sendError);
  }
};

module.exports = logout;
