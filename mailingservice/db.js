const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mailadmin:123password@cluster0.c6wqc7t.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DB connected"));

module.exports = mongoose;