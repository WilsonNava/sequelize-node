const express = require("express");
const studentModel = require("../models").Students;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/student/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const student = await studentModel.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (student) {
      res.status(200).send({
        success: true,
        data: student,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "there was an error",
      error,
    });
  }
});

router.post("/student", async (req, res) => {
  const body = req.body;

  try {
    const student = await studentModel.findOne({
      where: {
        email: body.email,
      },
    });

    if (student) {
      res.status(400).send({
        success: false,
        message: "Student already exist",
      });
    } else {
      const newStudent = await studentModel.create({
        ...body,
        password: bcrypt.hashSync(body.password, 10),
      });

      res.status(200).send({
        success: true,
        data: newStudent,
      });
    }
  } catch (error) {}
});

module.exports = router;
