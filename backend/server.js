const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
//config
require("dotenv").config({
  path: "./config/config.env",
});

//connect db
connectDB();

//app
const app = express();
const PORT = process.env.PORT || 5000;

//app user
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
}

//Load all routes
const authRouter = require("./routes/authRoute");

//use routes

app.use("/api", authRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Founded",
  });
});

//port
const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
