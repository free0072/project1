const mongoose = require('mongoose');

const scheduledEmailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  text: String,
  scheduleDate: String,
  scheduleTime: String,
  recurring: {
    type: Boolean,
    default: false,
  },
  sent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ScheduledEmail', scheduledEmailSchema);