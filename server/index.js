const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://sid:sid2004@cluster0.6dympwg.mongodb.net/backend?retryWrites=true&w=majority"
);
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("PASSWORD INCORRECT");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});
app.post("/checkUserExists", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ $or: [{ email: email }, { password: password }] })
    .then((user) => {
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    })
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("server is running");
});
