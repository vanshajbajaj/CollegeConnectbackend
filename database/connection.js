const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
// const User = require("./schemas/User");

mongoose.connect(
  "mongodb+srv://vanshajbajaj:CollegeConnect123@cluster0.xv0r9mw.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

module.exports = db;
