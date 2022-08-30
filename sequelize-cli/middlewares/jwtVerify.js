const JWT = require("jsonwebtoken");

const SECRET_KEY = "I AM A SUPER SECRET KEY";

const jwtVerify = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).send({
      success: false,
      message: "Not token in headers",
    });
  }

  JWT.verify(
    req.headers.authorization.split(" ")[1],
    SECRET_KEY,
    (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: "Token not valid",
          err,
        });
      } else {
        req.tokenData = decode;
        next();
      }
    }
  );
};

module.exports = {
  SECRET_KEY,
  jwtVerify,
};
