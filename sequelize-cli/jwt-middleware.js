const JWT = require("jsonwebtoken");
const SECRET_KEY = "MY_SUPER_SECRET";

module.exports = (req, res, next) => {
  JWT.verify(
    req.headers.authorization.split(" ")[1],
    SECRET_KEY,
    (err, decode) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          message: "Token not valid",
          err,
        });
      } else {
        console.log(decode);
        req.tokenData = decode;
        next();
      }
    }
  );
};
