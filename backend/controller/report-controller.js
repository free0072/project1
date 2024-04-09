const asyncHandler = require("express-async-handler");
const Report = require("../model/Report");
const User = require("../model/User");
const ScheduledEmail = require("../model/ScheduledEmail");
const { google } = require("googleapis");
const stream = require("stream");

// ...

exports.createReport = asyncHandler(async (req, res) => {
  const {
    uid,
    date,
    summary,
    tests,
    diagnosis,
    treatment,
    instructions,
    notes,
    status,
  } = req.body;
  const doctor = req.user._id;
  const reportFile = req.file;
  const patient = await User.findOne({ uid: uid });
  if (!patient) {
    return res.status(404).json({ message: "Invalid UID, user Not Found" });
  }

  // Authenticate with Google Drive API
  const auth = new google.auth.GoogleAuth({
    keyFile: "./keyFile.json",
    scopes: ["https://www.googleapis.com/auth/drive.file"], // Use the appropriate scope
  });

  const drive = google.drive({ version: "v3", auth });
  const bufferStream = new stream.PassThrough();
  bufferStream.end(reportFile.buffer);

  // // Create a file metadata
  // const fileMetadata = {
  //   name: reportFile.originalname,
  // };

  // // Create a readable stream from the uploaded file
  // const media = {
  //   mimeType: reportFile.mimetype,
  //   body: bufferStream,
  // };

  try {
    // Upload the file to Google Drive with public visibility
    const driveResponse = await drive.files.create({
      media: {
        mimeType: reportFile.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: reportFile.originalname,
        parents: ["1tEvfhd1vy6tP0YyTDfbwHVc1dkny4-XV"],
      },

      fields: "id,webViewLink", // Request the ID and webViewLink of the uploaded file
      // Set the permissions for public access
    });
    console.log(driveResponse);
    const reportUrl = driveResponse.data.webViewLink; // Get the file's web link
    // Create a new report with the file URL
    const newReport = new Report({
      patient: patient._id,
      doctor: doctor._id,
      date: date,
      summary,
      tests,
      diagnosis,
      treatment,
      instructions,
      notes,
      status,
      report: reportUrl,
    });

    const savedReport = await newReport.save();
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 
      const newSchedule = await ScheduledEmail({
        to: patient.email,
        subject: "Reminder for checkup",
        text: `Hi ${patient.name},\n\nYour Last check up was 6 months ago. Please visit the doctor soon for latest updates.`,
        sendDate: currentDate,
      })
      // sendDate: currentDate.setMonth(currentDate.getMonth()+6),
  
      newSchedule.save()

    } catch(e) {
      console.log(e)
    }
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    res.status(500).json({ message: "Error uploading file to Google Drive" });
  }
});

// Get a single report by ID
exports.getReportById = asyncHandler(async (req, res) => {
  const reportId = req.params.id;

  const report = await Report.findById(reportId).populate("patient doctor");

  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.status(200).json(report);
});

// Update a report by ID
exports.updateReport = asyncHandler(async (req, res) => {
  const reportId = req.params.id;
  const { summary, tests, diagnosis, treatment, prescription, report } =
    req.body;

  const updatedReport = await Report.findByIdAndUpdate(
    reportId,
    {
      summary,
      tests,
      diagnosis,
      treatment,
      prescription,
      report,
    },
    { new: true }
  );

  if (!updatedReport) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.status(200).json(updatedReport);
});

// Delete a report by ID
exports.deleteReport = asyncHandler(async (req, res) => {
  const reportId = req.params.id;

  const deletedReport = await Report.findByIdAndDelete(reportId);

  if (!deletedReport) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.status(200).json({ message: "Report deleted" });
});

// Get all reports for a specific user
exports.getAllUsersReport = asyncHandler(async (req, res) => {
  const uid = req.params.uid;

  const userReports = await Report.aggregate([
    {
      $lookup: {
        from: "users", // Assuming 'users' is the name of your User model's collection
        localField: "patient",
        foreignField: "_id",
        as: "patientData",
      },
    },
    {
      $lookup: {
        from: "users", // Assuming 'users' is the name of your User model's collection
        localField: "doctor",
        foreignField: "_id",
        as: "doctorData",
      },
    },
    {
      $match: {
        "patientData.uid": uid,
      },
    },
  ]);

  res.status(200).json(userReports);
});
