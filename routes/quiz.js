const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/quiz")
const check = require("../middlewares/auth");


//Definir rutas
router.get("/prueba", QuizController.pruebaQuiz);
router.post("/register", check.auth, QuizController.register);
router.post("/updateQ", check.auth, QuizController.updateQ);
router.post("/getQuestion", check.auth, QuizController.quizDescription);
router.get("/getAllQuestion", check.auth, QuizController.getAllQuestion);
//router.post("/getPerfil", check.auth, UserController.profile);

/*router.get("/profile/:id", check.auth, UserController.profile);
router.get("/list/:page?", check.auth, UserController.list);
router.put("/update", check.auth, UserController.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", UserController.avatar);
router.get("/counters/:id", check.auth, UserController.counters); */

//Exportar el router
module.exports = router;