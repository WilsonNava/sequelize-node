const express = require("express");
const EmailsModel = require("./models").Emails;
const UsersModel = require("./models").Users;

const PORT = 4001;
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await UsersModel.findAll({
      include: {
        model: EmailsModel, // Showind the associate data
      },
    });

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
    });
  }
});

app.get("/emails", async (req, res) => {
  try {
    const users = await EmailsModel.findAll({
      include: {
        model: UsersModel, // Showind the associate data
      },
    });

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});
