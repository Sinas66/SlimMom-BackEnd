const send404 = require("../../utils/send404");

const logout = (req, res) => {
  if (0) {
    send404(req, res, `wow`);
  }
  res.json({ logout: "ok" });
};

module.exports = logout;
