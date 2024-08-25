const Interview = require('../models/Interview');

exports.getCandidateReport = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidate: req.params.id }).populate('questions');
    const candidateReport = {
      interviews: interviews.map(interview => ({
        id: interview._id,
        status: interview.status,
        startTime: interview.startTime,
        endTime: interview.endTime,
        overallScore: interview.overallScore,
        feedback: interview.feedback,
        answers: interview.answers.map(answer => ({
          question: answer.question,
          code: answer.code,
          result: answer.result,
          score: answer.score,
          codeAnalysis: answer.codeAnalysis
        }))
      }))
    };
    res.send(candidateReport);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getInterviewReport = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate('questions');
    const interviewReport = {
      id: interview._id,
      candidate: {
        id: interview.candidate._id,
        username: interview.candidate.username,
        email: interview.candidate.email
      },
      status: interview.status,
      startTime: interview.startTime,
      endTime: interview.endTime,
      overallScore: interview.overallScore,
      feedback: interview.feedback,
      answers: interview.answers.map(answer => ({
        question: answer.question,
        code: answer.code,
        result: answer.result,
        score: answer.score,
        codeAnalysis: answer.codeAnalysis
      }))
    };
    res.send(interviewReport);
  } catch (error) {
    res.status(500).send(error);
  }
};