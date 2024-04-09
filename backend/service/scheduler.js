// Schedule emails in a separate Node.js script
require('dotenv').config()
const cron = require('node-cron');
const ScheduledEmail = require('../model/ScheduledEmail');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule('* * * * *', async () => {
  // Run the task every minute (you can adjust the schedule as needed)
  console.log('Running schedule');
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 
  const scheduledEmails = await ScheduledEmail.find({ sendDate: currentDate });
  for (const email of scheduledEmails) {
    const mailOptions = {
      from: 'Heath Management',
      to: email.to,
      subject: email.subject,
      text: email.text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    console.log(email)
    // Delete the sent email to prevent duplicates
    await ScheduledEmail.findByIdAndDelete(email._id);
  }
});
