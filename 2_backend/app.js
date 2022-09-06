const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./controller/appointment.controller.js");

const connectMongoDB = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 5000;

// -- connecting DB
connectMongoDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// -- get all users appointments
app.get("/api/appointments", getAppointments);

// -- create user appointment
app.post("/api/appointments", createAppointment);

// -- update user appointment
app.put("/api/appointments/:id", updateAppointment);

// -- delete user appointment
app.delete("/api/appointments/:id", deleteAppointment);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
