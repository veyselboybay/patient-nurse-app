// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'Motivational tips'
const MotivationalTipsSchema = new Schema({
  id: String,
  tip: String,
});

// Create the 'MotivationalTips' model out of the 'MotivationalTipsSchema'
module.exports = mongoose.model("MotivationalTips", MotivationalTipsSchema);
