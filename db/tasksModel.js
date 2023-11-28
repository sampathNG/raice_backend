const mongoose = require("mongoose");
const taskSchemaa = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const task_model = mongoose.model("tasks", taskSchemaa);
module.exports = task_model;
