const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongoDB = require("./config/db.js");
const Appointment = require("./models/Appointment.model.js");

const app = express();
const PORT = process.env.PORT || 5000;

// -- connecting DB
connectMongoDB();

// Middlewares
app.use(express.json());

// Routes
// -- get all users appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
  }
});

// -- create user appointment
app.post("/api/appointments", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

// -- update user appointment
app.put("/api/appointments/:id", async (req, res) => {
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

// -- delete user appointment
app.delete("/api/appointments/:id", async (req, res) => {
  const appointmentId = req.params.id;

  const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

  if (!deletedAppointment) {
    res.status(400).send("Appointment was not deleted.");
  }

  res.status(200).send("Appointment deleted");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
