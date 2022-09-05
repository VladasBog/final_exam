const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
