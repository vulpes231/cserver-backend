const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

async function eventLogger(message, fileName) {
  const dateItem = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
  const logItem = `${dateItem}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const filePath = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(filePath)) {
      await fsPromises.mkdir(filePath);
      await fsPromises.appendFile(
        path.join(filePath, fileName),
        logItem,
        "utf-8"
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function reqLogger(req, res, next) {
  eventLogger(`${req.method}\t${req.url}`, "req.txt");
  next();
}

function errLogger(err, req, res, next) {
  eventLogger(`${err.stack}\t${err}`, "err.txt");
  next();
}

module.exports = { eventLogger, errLogger, reqLogger };
