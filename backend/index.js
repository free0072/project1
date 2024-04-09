require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("./service/scheduler")



const userRoutes = require("./routes/user-routes");
const reportRoutes = require("./routes/report-routes");
const appointmentRoutes = require("./routes/appointment-routes");

mongoose
  .connect(`${process.env.mongoDbURI}`)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// Other app configurations

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use('/api/report', reportRoutes);
app.use("/api/appointment", appointmentRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`${PORT}`));