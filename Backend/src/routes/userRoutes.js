const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  registrarUser,
  loginUser,
  agregarDomicilio,
  consultarDomicilio,
  agregarPaymentMethod,
  consultarPaymentMethods
} = require("../controllers/userController");

const verificarToken= require("../middlewares/verificarToken");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/registro", registrarUser);
router.post("/login", loginUser);
router.post("/domicilio", verificarToken, agregarDomicilio);
router.get("/usuario/domicilio", verificarToken, consultarDomicilio);
router.post("/metodosPago",verificarToken, agregarPaymentMethod);
router.get("/usuario/metodosPago",verificarToken, consultarPaymentMethods);

module.exports = router;
