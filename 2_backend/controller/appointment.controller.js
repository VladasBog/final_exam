const Appointment = require("../models/Appointment.model.js");
const asyncHandler = require("express-async-handler");

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();

  if (appointments) {
    return res.status(200).json(appointments);
  } else {
    return res.status(404).json({ message: "Appointments doesn't exist" });
  }
});

const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, date, time } = req.body;

  //  check if time already exists
  const timeExists = await Appointment.findOne({ time, date });

  // if exists: throwing error
  if (timeExists) {
    res
      .status(400)
      .send({ message: "Appointment already exists", success: false });
    return;
  }

  // if does not exists: saving appointment data to DB
  const appointment = await Appointment.create({ name, email, date, time });

  // -- after successful save to db, sending confirmation message

  if (appointment) {
    return res
      .status(201)
      .json({ message: "Appointment registered", success: true });
  } else {
    res.status(400).send({ message: "Invalid appointment data" });
    throw new Error({ message: "Invalid appointment data" });
  }
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const appointmentToUpdate = req.body;

  //  find appointment by id and update
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    appointmentToUpdate
  );

  // if appointment id exists
  if (updatedAppointment) {
    return res.status(400).json({ message: "Appointment updated" });
  } else {
    res.status(201).send({ message: "Appointment failed to update" });
    throw new Error({ message: "Appointment failed to update" });
  }
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;

  const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

  if (deletedAppointment) {
    res.status(201).send({ message: "Appointment deleted" });
  } else {
    res.status(400).send({ message: "Appointment was not deleted." });
  }
});

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
