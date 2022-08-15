const express = require("express");
const app = express();
const appRoutes = require("./routes");
const PORT = 3001;

app.use(express.json());
app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
