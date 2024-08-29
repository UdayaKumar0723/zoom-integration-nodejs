const express = require("express");
const zoomController = require("./../controllers/zoomMeeting");

const routes = express.Router();

routes.post("/", zoomController.createZoomSession);

module.exports = routes;
