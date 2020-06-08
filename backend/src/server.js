const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(port, () =>
  console.log(`Server started in http://localhost:${port}`)
);
