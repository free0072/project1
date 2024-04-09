const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth"); 
const reportController = require("../controller/report-controller");
const multer = require('multer');
const upload = multer()

router.use(userAuth);

// Create a new report with file upload
router.post("/create", upload.single("reportFile"), reportController.createReport);

// Get a single report by ID
router.get("/:id", reportController.getReportById);

// Update a report by ID
router.put("/:id", reportController.updateReport);

// Delete a report by ID
router.delete("/:id", reportController.deleteReport);

// Get all reports for the authenticated user
router.get("/all/:uid", reportController.getAllUsersReport);

module.exports = router;
