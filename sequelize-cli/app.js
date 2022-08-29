const express = require("express");
const app = express();
const productRoutes = require("./routes/product");
const studentsRoutes = require("./routes/students");
const PORT = 3001;

app.use(express.json());
app.use("/", productRoutes);
app.use("/", studentsRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
