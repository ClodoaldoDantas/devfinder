const express = require("express");
const routes = express.Router();

const devController = require("./controllers/DevController");
const upload = require("./config/multer");

routes.get("/developers", devController.index);
routes.post("/developers", upload.single("image"), devController.create);

module.exports = routes;
