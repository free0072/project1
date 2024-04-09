require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Appointment = require("../model/Appointment");
const axios = require('axios')

exports.createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time } = req.body;
  const patient = req.user._id;
  const newAppointment = new Appointment({
    doctor: doctorId,
    patient: patient,
    date: date,
    time: time,
  });

  await newAppointment.save();

  // Fetch doctor's email from the database
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  // Convert the appointment date and time to GMT
  const { gmtDate, gmtTime } = convertToGMT(date, time);

  // Prepare email content
  const patientEmailData = {
    to: req.user.email,
    subject: `Appointment Confirmation`,
    text: `Your appointment with Dr. ${doctor.name} is scheduled on ${gmtDate} at ${gmtTime} (GMT).`,
    scheduleDate: gmtDate,
    scheduleTime: gmtTime,
    recurring: false,
  };

  const doctorEmailData = {
    to: doctor.email,
    subject: `New Appointment Scheduled`,
    text: `A new appointment has been scheduled with you on ${gmtDate} at ${gmtTime} (GMT) by ${req.user.name}.`,
    scheduleDate: gmtDate,
    scheduleTime: gmtTime,
    recurring: false,
  };

  // The URL of your mailing service API
  const emailServiceURL = `${process.env.EMAIL_SERVICE_URL}/emails/schedule`;

  try {
    // Schedule email for the patient
    await axios.post(emailServiceURL, patientEmailData);
    // Schedule email for the doctor
    await axios.post(emailServiceURL, doctorEmailData);
    
    // Respond to the appointment creation request
    res.status(200).json(newAppointment);
  } catch (error) {
    console.error('Error calling the mailing service API:', error);
    // Handle the error appropriately
    res.status(500).json({ message: 'Failed to schedule emails' });
  }
});

exports.updateAppointment = asyncHandler(async (req, res) => {
  const { appointmentId, status } = req.body;
  const existingAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: status }
  );
  console.log(status);
  await existingAppointment.save();
  res.status(200).json(existingAppointment);
});

exports.getAllAppointmentsByUser = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const allAppointments = await Appointment.find({ patient: user });
  res.status(200).json(allAppointments);
});

exports.getAllAppointmentsByDoctor = asyncHandler(async (req, res) => {
  const doctor = req.user._id;
  const allAppointments = await Appointment.find({ doctor: doctor }).populate(
    "patient doctor"
  );

  res.status(200).json(allAppointments);
});
exports.getAllConfirmedAppointmentByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const confirmedAppointments = await Appointment.find({
    patient: userId,
    status: "Accepted",
  }).populate("patient doctor");

  res.status(200).json(confirmedAppointments);
});

exports.getAllConfirmedAppointmentByDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const confirmedAppointments = await Appointment.find({
    doctor: doctorId,
    status: "Confirmed",
  }).populate("patient doctor");
  res.status(200).json(confirmedAppointments);
});

exports.getAllUpcomingAppointmentByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const upcomingAppointments = await Appointment.find({
    patient: userId,
    // Combine the "date" and "time" fields into a single Date object
    $where: function () {
      const currentDate = new Date();
      const appointmentDate = new Date(this.date + "T" + this.time + ":00");
      return appointmentDate >= currentDate && this.status === "Confirmed";
    },
  }).populate("patient doctor");
  console.log(new Date());
  res.status(200).json(upcomingAppointments);
});

exports.getAllUpcomingAppointmentByDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const upcomingAppointments = await Appointment.find({
    doctor: doctorId,
    // Combine the "date" and "time" fields into a single Date object
    $where: function () {
      const currentDate = new Date();
      const appointmentDate = new Date(this.date + "T" + this.time + ":00");
      return appointmentDate >= currentDate && this.status === "Confirmed";
    },
  }).populate("patient doctor");
  console.log(new Date());
  res.status(200).json(upcomingAppointments);
});

exports.getAllCompletedAppointmentByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const completedAppointments = await Appointment.find({
    patient: userId,
    status: "Completed",
  }).populate("patient doctor");
  res.status(200).json(completedAppointments);
});

exports.getAllCompletedAppointmentByDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const completedAppointments = await Appointment.find({
    doctor: doctorId,
    status: "Completed",
  }).populate("patient doctor");
  res.status(200).json(completedAppointments);
});

exports.getAllPendingAppointmentByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const pendingAppointments = await Appointment.find({
    patient: userId,
    status: "Pending",
  }).populate("patient doctor");
  res.status(200).json(pendingAppointments);
});

exports.getAllPendingAppointmentByDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const pendingAppointments = await Appointment.find({
    doctor: doctorId,
    status: "Pending",
  }).populate("patient doctor");
  res.status(200).json(pendingAppointments);
});

exports.getAllRejectedAppointment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const rejectedAppointments = await Appointment.find({
    patient: userId,
    status: "Rejected",
  }).populate("patient doctor");
  res.status(200).json(rejectedAppointments);
});


function convertToGMT(localDate, localTime) {
  const localDateTimeStr = `${localDate}T${localTime}:00`;


  const localDateTime = new Date(localDateTimeStr);

  const gmtDateTime = new Date(localDateTime.getTime() + (localDateTime.getTimezoneOffset() * 60000));

  const gmtDate = gmtDateTime.toISOString().split('T')[0];
  const gmtTime = gmtDateTime.toISOString().split('T')[1].substring(0, 5);

  return { gmtDate, gmtTime };
}