const express = require("express");
const router = express.Router();
const {getProductos, getProductoById, agregarProducto,modifyProducto, getAllProducts}= require("../controllers/productController");
const verificarToken= require("../middlewares/verificarToken");

router.get("/", getProductos);
router.get("/:id", getProductoById)
router.post("/",verificarToken, agregarProducto);
router.put("/:idProducto",verificarToken, modifyProducto);
router.get("/productos/all", getAllProducts);

module.exports = router;