const express = require("express");
const authUser = require("./routes/auth.route");


const app = express();

app.use(express.json());

app.use("/api/auth",authUser);

module.exports = app;
