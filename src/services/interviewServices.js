const Interview = require("../models/Interview");
const Question = require("../models/Question");
const codeExeService = require("./codeExeService");
const codeAnalysisService = require("./codeAnalysisService");

const startInterview = async (candidateId) => {
  const questions = await Question.aggregate([{ $sample: { size: 3 } }]);
  const interview = new Interview({
    candidate: candidateId,
    questions: questions.map((q) => q.id),
    status: "in- progress",
    startTime: new Date(),
  });
  await interview.save();
  return interview;
};

exports.submitAnswer = async (interviewId, questionId, code) => {
  const interview = await Interview.findById(interviewId);
  const question = await Question.findById(questionId);

  const result = await codeExeService.executeCode(
    code,
    "javascript",
    question.testCases
  );

  const score = calcScore(result, question.testCases);

  const codeAnalysis = await codeAnalysisService.analyzeCode(code);

  interview.answers.push({
    question: questionId,
    code,
    result,
    score,
    codeAnalysis,
  });

  if (interview.answers.length === interview.questions.length) {
    interview.status = "completed";
    interview.endTime = new Date();
    interview.overallScore = calcOverallScore(interview.answers);
  }

  await interview.save();
  return interview;
};

function calcScore(result, testCases) {
  //scoring logic based on test case results
}

function calcOverallScore(answers) {
  // logic for calculating the overallScore
}
