require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");

// Database setup
require("./database/connection");
const api = require("./routes/api");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    sameSite: "lax",
    cookie: {
      name: "session",
      maxAge: 60 * 60 * 1000,
    },
  })
);

api.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use("/api", api);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
