const express = require('express');
const router = express.Router();
const InterviewController = require('../controllers/interviewController');
const auth = require('../middlewares/auth');

router.post('/start', auth, InterviewController.startInterview);
router.post('/:id/submit', auth, InterviewController.submitAnswer);
router.get('/:id', auth, InterviewController.getInterviewDetails);
router.get('/candidate/:id', auth, InterviewController.getCandidateInterviews);

module.exports = router;