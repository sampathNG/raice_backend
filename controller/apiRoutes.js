const api = exports;
const users = require("../db/userModel");
const tasks = require("../db/tasksModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
api.start = async (req, res) => {
  try {
    console.log("Hello, world!");
    res.send("Hello, world!");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
// USERS
api.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new users({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const savedUser = await user.save();
    console.log("user created successfully");
    res.send("user created successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey", {
      expiresIn: "72h",
    });
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getAllUsers = async (req, res) => {
  try {
    const x = await users.find();
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.deleteAllUsers = async (req, res) => {
  try {
    await users.deleteMany();
    console.log("users deleted");
    res.send("users deleted");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
// taskS
api.createtask = async (req, res) => {
  try {
    const task = new tasks({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
    });
    const savedUser = await task.save();
    console.log("task created successfully");
    res.send("task created successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getAlltasks = async (req, res) => {
  try {
    const x = await tasks.find();
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.getOnetask = async (req, res) => {
  try {
    const x = await tasks.findById({ _id: req.params.id });
    console.log(x);
    res.send(x);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.deleteOnetask = async (req, res) => {
  try {
    await tasks.findByIdAndDelete({ _id: req.params.id });
    console.log("task deleted");
    res.send("task deleted");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
api.updateOnetask = async (req, res) => {
  try {
    const update = await tasks.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!update) {
      console.log("task not found");
      res.send("task not found");
    }
    console.log("task updated");
    res.send("task updated");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
