/* SERVER.JS */

// const express = require("express");
// const app = express();
// const port = 3000;
// var bodyParser = require("body-parser");
// var tasks = {
//   task: [],
// };

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//   res.render("pages/index", tasks);
// });

// app.post("/addTodo", (req, res) => {
//   tasks.task.push({
//     caption: req.body.caption,
//     isCompleted: false,
//   });
//   res.redirect("/");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

/* PRACTICE */

// const Joi = require("joi");
// const express = require("express");
// const app = express();
// const courses = [
//   {
//     id: 1,
//     name: "course1",
//   },
//   {
//     id: 2,
//     name: "course2",
//   },
//   {
//     id: 3,
//     name: "course3",
//   },
// ];

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.get("/api/courses", (req, res) => {
//   res.send(courses);
// });

// app.get("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course) {
//     res.status(404).send("NOT FOUND");
//   }
//   res.send(course);
// });

// app.post("/api/courses", (req, res) => {
//   const { error } = validateCourse(req.body);
//   // console.log(result);

//   if (error) return res.status(400).send(error.details[0].message);

//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };
//   courses.push(course);
//   res.send(course);
// });

// app.put("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   // if course not found
//   if (!course) return res.status(404).send("NOT FOUND");

//   //Validation

//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(result.error.details[0].message);

//   //Update course
//   course.name = req.body.name;
//   //return Updated course
//   res.send(course);
// });

// app.delete("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   // if course not found
//   if (!course) return res.status(404).send("NOT FOUND");

//   const index = courses.indexOf(course);
//   courses.splice(index, 1);
//   res.send(course);
// });

// function validateCourse(course) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   return Joi.validate(course, schema);
// }

// const Port = process.env.PORT || 3000;
// app.listen(3000, () => console.log(`listening to port ${Port}...`));

/* PRACTICE REVISION (without JOI) */

const express = require("express");
const app = express();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.use(express.json());

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("ID Not Found");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("invalid name(should be at least 3 characters long)");
  }
  // console.log(req.body.name);
  const course = { id: courses.length + 1, name: req.body.name };

  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("invalid name(should be at least 3 characters long)");
  }
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  course.name = req.body.name;
  res.send(courses);
});

app.delete("/api/courses/:id", (req, res) => {
  courses.splice(req.params.id - 1, 1);
  res.send(courses);
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
