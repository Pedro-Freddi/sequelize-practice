"use strict";

require("dotenv").config();
require("./models/index.js");
const express = require("express");
const apiRouter = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT ${process.env.PORT}`);
});