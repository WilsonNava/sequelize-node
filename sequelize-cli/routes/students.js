const express = require("express");
const studentModel = require("../models").Students;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op } = require("sequelize");

const { SECRET_KEY, jwtVerify } = require("../middlewares/jwtVerify");

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

router.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await studentModel.findOne({
      where: {
        email,
      },
    });

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }
    const isValidPassword = bcrypt.compare(password);

    if (!isValidPassword) {
      return res.status(301).send({
        success: false,
        message: "Password or email not valid",
      });
    }

    const token = JWT.sign(
      {
        email,
      },
      SECRET_KEY,
      {
        expiresIn: 1000 , // 10 min
      }
    );

    res.status(200).send({
      success: true,
      token,
    });
  } catch (error) {}
});

router.get("/profile", jwtVerify, async (req, res) => {
  try {
    const student = await studentModel.findOne({
      where: {
        email: req.tokenData.email,
      },
    });

    res.status(200).send({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
    });
  }
});

module.exports = router;
