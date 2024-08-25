const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      code: String,
      result: String,
      score: Number,
    },
  ],
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed"],
    default: "completed",
  },
  startTime: Date,
  endTime: Date,
  overallScore: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Interview', InterviewSchema)