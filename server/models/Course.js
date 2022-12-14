const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Course = new Schema({
  id: String,
  courseCode: String,
  courseName: String,
  section: String,
  semester: String,
});

module.exports = mongoose.model("Course", Course);
