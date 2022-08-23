const express = require("express");
const Products = require("../models").Products;

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "name"],
      limit: 10,
      offset: 0,
      order: [["name", "ASC"]],
    });
    res.status(200).send({
      sucess: true,
      products: products || [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      message: "error getting products",
      error,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Products.findAll({
      where: {
        id,
      },
    });
    res.status(200).send({
      sucess: true,
      products: products || [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      message: "error getting products",
      error,
    });
  }
});

module.exports = router;
