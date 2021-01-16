const express = require("express");
const app = express();
const path = require("path");

// middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static("./public/auth"));
app.use(express.static("./public/chat"));
app.use(express.static("./public/user"));

// import routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/chat"));
app.use("/", require("./routes/user"));


// listen
app.listen(3000, () => console.log("Server is running on Port 3000"));