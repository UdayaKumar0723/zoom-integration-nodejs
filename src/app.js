const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
  path: "./../config.env",
});

const meetingRoutes = require("./routes/meeting.js");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/zoom/meeting", meetingRoutes);

app.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
