const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  testCases: [{ input: String, output: String }],
  solutionTemp:{tyoe: String},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Question", QuestionSchema);
