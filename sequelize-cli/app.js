const express = require("express");
const app = express();
const productRoutes = require("./routes/product");
const PORT = 3001;

app.use(express.json());
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
