const express = require("express");
const cookieParser =  require("cookie-parser")


const authUser = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cors = require("cors");


const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/auth",authUser);

app.use("/api/product",productRoute)

module.exports = app;
