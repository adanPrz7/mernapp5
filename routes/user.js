const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user")
const check = require("../middlewares/auth");


//Definir rutas
router.get("/prueba-usuario", UserController.pruebaUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/getPerfil", check.auth, UserController.profile);
router.post("/UpdateP", check.auth, UserController.UpdateP);
router.post("/UpdateC", check.auth, UserController.UpdateC);
router.get("/getContador", check.auth, UserController.getContador);
/*router.get("/profile/:id", check.auth, UserController.profile);
router.get("/list/:page?", check.auth, UserController.list);
router.put("/update", check.auth, UserController.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", UserController.avatar);
router.get("/counters/:id", check.auth, UserController.counters); */

//Exportar el router
module.exports = router;