const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require('dotenv').config()

//express app
const app = express();
const username =process.env.USERNAME;
const password =process.env.PASSWORD;

// connect to mongodb
const dbURI =
  "mongodb+srv://" + username +":" + password + "@cluster0.ucavl.mongodb.net/SuperBlog?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

//for accepting form data:
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.redirect("/api/blogs");
});

app.get("/api/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/api/blogs", blogRoutes);

//404 Page - if the code reaches this point, it fires
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = app;
