const express = require("express");
const { reqLogger, errLogger } = require("./middlewares/event-logger");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./configs/connectdb");
const { corsOptions } = require("./configs/cors-option");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 2500;

const cors = require("cors");

app.use(reqLogger);

connectDB();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/root"));
app.use("/package", require("./routes/package"));

app.use(errLogger);

mongoose.connection.once("open", () => {
  console.log(`Connected to database...`);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
