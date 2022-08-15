const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

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
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "User",
    timestamps: true,
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
  try {
    const user = await User.create(req.body);

    res.status(201).send({
      sucess: true,
      message: "User created succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error creating user",
    });
  }
});

//bulk create
router.post("/users", async (req, res) => {
  try {
    const users = await User.bulkCreate(req.body);
    res.status(201).send({
      sucess: true,
      message: "Users created succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error creating user",
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error getting users",
    });
  }
});

router.get("/inactive-users", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "0",
      },
    });

    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error getting users",
    });
  }
});

router.put("/user", async (req, res) => {
  try {
    const updatedUser = await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        rollNo: req.body.rollNo,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.status(200).send({
      sucess: true,
      message: "User updated was succesful",
    });
  } catch (error) {
    res.status(400).send({
      message: "Error updating user",
    });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      sucess: true,
      message: "User deletion was succesful",
    });
  } catch (error) {
    res.status(400).send({
      message: "Error deleting user",
    });
  }
});

router.get("/user-raw", async (req, res) => {
  try {
    const response = await sequelize.query("SELECT * FROM users", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).send({
      sucess: true,
      data: response,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: "Error getting user data",
    });
  }
});

module.exports = router;
