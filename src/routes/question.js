const express = require("express");
const router = express.Router();
const auth  = require("../middlewares/auth");
const {
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} = require("../controllers/questController");

router.route("/").get(auth, getAllQuestions).post(auth, createQuestion);

router
  .route("/:id")
  .get(auth, getQuestionById)
  .put(auth, updateQuestion)
  .delete(auth, deleteQuestion);

// router.get("/", auth, getAllQuestions);
// router.post("/", auth, createQuestion);
// router.get("/:id", auth, getQuestionById);
// router.put("/:id", auth, updateQuestion);
// router.delete("/:id", auth, deleteQuestion);

module.exports = router;
