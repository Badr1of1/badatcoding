const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');
const auth = require('../middlewares/auth');

router.get('/candidate/:id', auth, ReportController.getCandidateReport);
router.get('/interview/:id', auth, ReportController.getInterviewReport);

module.exports = router;