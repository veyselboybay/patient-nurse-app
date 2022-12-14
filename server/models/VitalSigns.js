// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'VitalSigns'
const VitalSignsSchema = new Schema({
  id: String,
  patientId: String,
  bodyTemperature: Number,
  heartRate: Number,
  bloodPressure: Number,
  respiratoryRate: Number,
  lastVisit: String,
});

// Create the 'VitalSigns' model out of the 'VitalSignsSchema'
module.exports = mongoose.model("VitalSigns", VitalSignsSchema);
