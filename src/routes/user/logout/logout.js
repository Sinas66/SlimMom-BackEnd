const jwt = require("jsonwebtoken");
const { secret } = require(`../../../config`);
const bcrypt = require("bcrypt");
const User = require("../../../db/schemas/user");

const logout = (req, res) => {
  // проверяем токен
  // парсим токен, берем айди, удаляем по айди токен
  // или мидлвар который будет парсит токен, проверяет его и добавляет его в реквест если ок

  console.log(req.user);


  const token = req

};

module.exports = logout;
