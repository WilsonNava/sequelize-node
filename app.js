const express = require("express");
const Sequelize = require("sequelize");
const app = express();

const PORT = 3001;

app.use(express.json());

const sequelize = new Sequelize("node-orm", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((sucess) => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
