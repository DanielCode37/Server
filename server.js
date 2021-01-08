const express = require("express");
const app = express();
const path = require("path");

// middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/chat"));

// listen
app.listen(3000, () => console.log("Server is running on Port 3000"));