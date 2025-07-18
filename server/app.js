const express = require("express");
const cors = require("cors");
const bugRoutes = require("./routes/bugRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bugs", bugRoutes);

app.use(errorHandler); // Error handling middleware

module.exports = app;
