const { verifyPassword, findByEmail } = require("../models/users");
const { SESSION_COOKIE_NAME } = require("../env");

module.exports.handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).send("Could not destroy session");
    res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    return res.status(200).send("session deleted");
  });
};

module.exports.handleLoginNormalUser = async (req, res) => {
  const user = await findByEmail(req.body.email, false);
  const checkedPassword = await verifyPassword(user, req.body.password);

  if (!user) {
    return res.sendStatus(401);
  }

  if (checkedPassword && user) {
    if (req.body.stayConnected) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
    }
    req.session.userId = user.id;

    req.session.save((err) => {
      if (err) return res.sendStatus(500);
      const userDetails = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      return res.status(200).json(userDetails);

      // req.session.save(() => {
      //   res.status(200).send(req.session);
      // });
      // return null;
    });
  }
  return res.status(401).send("Invalid Credentials");
};
