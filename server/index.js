const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const Jwt = require("jsonwebtoken");
const jwtkey = "login-signup";
const app = express();
// const { createServer } = require("vite");

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
        Jwt.sign({ user }, jwtkey, (err, token) => {
          if (err) {
            res.send({ result: "user not found from token" });
          }
          res.send({ user, auth: token });
        });
        // res.json("Success");
      } else {
        res.json("PASSWORD INCORRECT");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", async (req, res) => {
  try {
    const newUser = await EmployeeModel.create(req.body);

    // Sign JWT token for the new user
    Jwt.sign({ user: newUser }, jwtkey, (err, token) => {
      if (err) {
        return res.send({ result: "user not found from token" });
      }

      // Send user data and token
      return res.send({ user: newUser, auth: token });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard!" });
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

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(3001, () => {
  console.log("server is running");
});
