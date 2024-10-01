const jwt = require("jsonwebtoken");

module.exports = function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You Need To Login first");
    return res.redirect("/");
  }
  try {
    const data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
    next();
  } catch (error) {
    res.flash("error", "You Need To Login first")
    res.redirect('/')
  }
}

