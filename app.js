const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const tasks = ["Buy Ingredients", "Cook Food", "Make Food"];
const works = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, tasksAdded: tasks });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", tasksAdded: works });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/", function (req, res) {
  const task = req.body.newTask;
  if (req.body.list === "Work") {
    works.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }
});

app.listen(80, function () {
  console.log("Server has started on port 3000.");
});
