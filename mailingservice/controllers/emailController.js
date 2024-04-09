const ScheduledEmail = require('../models/ScheduledEmail');

exports.createScheduledEmail = async (req, res) => {
  try {
    const { to, subject, text, scheduleDate, scheduleTime, recurring } = req.body;

    // Create a new scheduled email
    const scheduledEmail = new ScheduledEmail({
      to,
      subject,
      text,
      scheduleDate,
      scheduleTime,
      recurring,
    });

    // Save the scheduled email to the database
    await scheduledEmail.save();

    res.status(201).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getScheduledEmails = async (req, res) => {
  try {
    const scheduledEmails = await ScheduledEmail.find();
    res.json(scheduledEmails);
  } catch (error) {
    console.error('Error retrieving scheduled emails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateScheduledEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { to, subject, text, scheduleDate, scheduleTime, recurring } = req.body;

    const updatedEmail = await ScheduledEmail.findByIdAndUpdate(
      id,
      { to, subject, text, scheduleDate, scheduleTime, recurring },
      { new: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({ message: 'Scheduled email not found' });
    }

    res.json(updatedEmail);
  } catch (error) {
    console.error('Error updating scheduled email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteScheduledEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmail = await ScheduledEmail.findByIdAndDelete(id);

    if (!deletedEmail) {
      return res.status(404).json({ message: 'Scheduled email not found' });
    }

    res.json({ message: 'Scheduled email deleted successfully' });
  } catch (error) {
    console.error('Error deleting scheduled email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};