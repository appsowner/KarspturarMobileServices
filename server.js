require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const corsOptions = require("./config/corsOptions");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// Connect to MongoDB
connectDB();

// middlewares-server
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// routes middlewares-fs: option 2 (optime)
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT;

// listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
