const mongoose = require('mongoose');

const scheduledEmailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  text: String,
  sendDate: Date,
});

module.exports = mongoose.model('ScheduledEmail', scheduledEmailSchema);
