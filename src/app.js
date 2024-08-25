const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", require("./routes/question"));
app.use("/api/users", require("./routes/users"));
app.use("/api/interviews", require("./routes/interviews"));
app.use("/api/auth", require("./routes/auth"));
app.use('/api/reports', require('./routes/reports'));

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.error;
  }
};

start();
