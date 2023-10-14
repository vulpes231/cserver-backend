const express = require("express");
const { reqLogger, errLogger } = require("./middlewares/event-logger");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 2500;

app.use(reqLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes/root"));

app.use(errLogger);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
