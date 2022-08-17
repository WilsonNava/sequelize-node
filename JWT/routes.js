const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "MY_SUPER_SECRET";
const JWTMiddleware = require("./jwt-middleware");

const sequelize = new Sequelize("node-orm", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true, // it should be unique, it is just for dev purposes
    },
    password: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);

sequelize
  .authenticate()
  .then((sucess) => {
    console.log("Connected to DB");

    sequelize.sync();
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

router.post("/user", async (req, res) => {
  const { name, email, status } = req.body;

  const password = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password,
      status,
    });

    res.status(201).send({
      sucess: true,
      message: "User created succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error creating user",
      error,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).send({
      sucess: true,
      // message: "User created succesfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error getting users",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const token = JWT.sign(
          {
            email: user.email,
            id: user.id,
          },
          SECRET_KEY,
          {
            expiresIn: 1000 * 60 * 10, // valid por 10 minutes
          }
        );
        res.status(200).send({
          sucess: true,
          message: "User loged in succesfully",
          token,
        });
      } else {
        res.status(400).send({
          sucess: false,
          message: "wrong password",
        });
      }
    } else {
      res.status(404).send({
        sucess: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error login user",
    });
  }
});

router.post("/validate", (req, res) => {
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
        res.status(200).send({
          sucess: true,
          message: "token valid",
          decode,
        });
      }
    }
  );
});

router.get("/profile", JWTMiddleware, (req, res) => {
  try {
    res.status(200).send({
      sucess: true,
      data: req.tokenData,
    });
  } catch (error) {
    res.status(400).send({
      message: "Token not valid",
      error,
    });
  }
});

module.exports = router;
