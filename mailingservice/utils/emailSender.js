const cron = require('node-cron');
const nodemailer = require('nodemailer');
const ScheduledEmail = require('../models/ScheduledEmail');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "mindit072@gmail.com",
    pass: "luvxldvlfkddwcyu",
  },
});

async function sendScheduledEmails() {
  const currentDateTime = new Date();
  const currentDate = new Date().toISOString().split('T')[0]; // This is already in GMT
  const currentTime = new Date().toUTCString().split(' ')[4].substring(0, 5); // Extracting HH:MM part from UTC string
  console.log("current time is ", currentTime, "current date is ", currentDate);

  const scheduledEmails = await ScheduledEmail.find({
    $or: [
      { scheduleDate: currentDate, scheduleTime: currentTime, sent: false },
      { recurring: true, scheduleTime: currentTime },
    ],
  });

  console.log("candidates mail ", scheduledEmails);

  for (const email of scheduledEmails) {
    const mailOptions = {
      from: 'Email Scheduler',
      to: email.to,
      subject: email.subject,
      text: email.text,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        if (email.recurring) {
          // Update the scheduleDate to the next occurrence for recurring emails
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + 1); // Set it to send the next day
          const nextScheduleDate = nextDate.toISOString().split('T')[0];
          await ScheduledEmail.findByIdAndUpdate(email._id, { scheduleDate: nextScheduleDate });
        } else {
          // Delete non-recurring emails after sending
          await ScheduledEmail.findByIdAndDelete(email._id);
        }
      }
    });
  }
}

function startEmailScheduler() {
  // Schedule email sending every minute
  cron.schedule('* * * * *', sendScheduledEmails);
}

module.exports = {
  startEmailScheduler,
};
