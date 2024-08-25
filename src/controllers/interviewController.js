const Interview = require("../models/Interview");
const interviewService = require("../services/interviewServices");

const startInterview = async (req, res) => {
  try {
    const interview = await interviewService.startInterview(req.user._id);
    res.status(201).json({ interview });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { questionId, code } = req.body;
    const interview = await interviewService.submitAnswer(
      req.params.id,
      questionId,
      code
    );
    res.status(200).json({ interview });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getInterviewDetails = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      "questions"
    );
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json({ interview });
  } catch (err) {}
};

const getCandidateDetails = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidate: req.params.id });
    res.status(200).json({ interviews });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getCandidateInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidate: req.params.id });
    res.send(interviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  startInterview,
  submitAnswer,
  getInterviewDetails,
  getCandidateDetails,
  getCandidateInterviews,
};
