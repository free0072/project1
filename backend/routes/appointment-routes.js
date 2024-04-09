const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth"); 

const appointmentController = require("../controller/appointment-controller");


router.use(userAuth);

// Define routes for appointment-related operations
router.post("/create", appointmentController.createAppointment);
router.put("/update", appointmentController.updateAppointment);
router.get("/all/user", appointmentController.getAllAppointmentsByUser);
router.get("/all/doctor", appointmentController.getAllAppointmentsByDoctor);
router.get("/confirmed/user", appointmentController.getAllConfirmedAppointmentByUser);
router.get("/confirmed/doctor", appointmentController.getAllConfirmedAppointmentByDoctor);
router.get("/upcoming/user", appointmentController.getAllUpcomingAppointmentByUser);
router.get("/upcoming/doctor", appointmentController.getAllUpcomingAppointmentByDoctor);
router.get("/completed/user", appointmentController.getAllCompletedAppointmentByUser);
router.get("/completed/doctor", appointmentController.getAllCompletedAppointmentByDoctor);
router.get("/pending/user", appointmentController.getAllPendingAppointmentByUser);
router.get("/pending/doctor", appointmentController.getAllPendingAppointmentByDoctor);
router.get("/rejected/user", appointmentController.getAllRejectedAppointment);

module.exports = router;
