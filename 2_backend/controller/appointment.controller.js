const Appointment = require("../models/Appointment.model.js");
const asyncHandler = require("express-async-handler");

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();

  res.status(200).send(appointments);
});

const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, time } = req.body;

  //  check if time already exists
  const timeExists = await Appointment.findOne({ time });

  // if exists: throwing error
  if (timeExists) {
    res.status(400).send("Appointment already exists");
    return;
  }

  // if does not exists: saving appointment data to DB
  const appointment = await Appointment.create({ name, email, time });

  // -- after successful save to db, sending confirmation message

  if (appointment) {
    res.status(201).send("Appointment registered");
  } else {
    res.status(400).send("Invalid appointment data");
  }
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const appointmentToUpdate = req.body;

  // -- checking if time exists
  const { time } = appointmentToUpdate;
  const timeExists = await Appointment.findOne({ time });

  // -- if exists : throw error
  if (timeExists) {
    res.status(400).send("Appointment already exists in this time");
    return;
  }

  //  if does not exists find appointment by id and update
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    appointmentToUpdate
  );

  // if appointment id doesn't exists
  if (!updatedAppointment) {
    res.status(400).send("Appointment failed to updated");
    return;
  }

  res.status(201).send("Appointment updated");
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;

  const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

  if (!deletedAppointment) {
    res.status(400).send("Appointment was not deleted.");
  }

  res.status(200).send("Appointment deleted");
});

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
