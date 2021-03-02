const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const app = express();
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/sellorder", require("./routes/index.routes"));

module.exports = app;
