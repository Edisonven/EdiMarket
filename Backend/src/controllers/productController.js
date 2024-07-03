const {
  consultarProductos,
  consultarProductoById,
  registrarProducto,
  agregarCarrito,
  consultarProductosByCategoria,
  consultarCarrito,
  eliminarProducto,
  venta,
  modificarProducto,
  allProducts
} = require("../models/userModel");
const {prepHateoasProductos,prepHateoasCategorias} = require("../models/hateoasModel");
const jwt = require("jsonwebtoken");

const getProductos = async (req, res) => {
  try {
    const {limits=12,page=1, order_by='fecha_DESC'} = req.query;
    const productos = await consultarProductos(limits,page, order_by);
    console.log(productos.products.reverse());
    const hateoas = await prepHateoasProductos(productos.products,page,productos.productsAll);
    res.send(hateoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {limits,page=1, order_by} = req.query;
    const productos = await allProducts(limits,page, order_by);
    res.send(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await consultarProductoById(id);
    res.send(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const producto = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    
    await registrarProducto(producto, id);
  
    
    console.log(
      `El usuario ${email} con el id ${id} ha registrado un producto`
    );
    res.status(201).json({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      estado: producto.estado,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      categoria: producto.categoria,
      fecha: producto.fecha_producto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const modifyProducto = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const producto = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    await modificarProducto(id, idProducto, producto);
    console.log(
      `El usuario ${email} con el id ${id} ha modificado un producto`
    );
    res.status(200).json({
      message: "Producto modificado",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductosByCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const {limits=12,page=1, order_by} = req.query;
    const productos = await consultarProductosByCategoria(categoria,limits,page, order_by);
    const hateoas = await prepHateoasCategorias(productos.products,page,categoria,productos.productsAll);
    res.send(hateoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const añadirProductoCarrito = async (req, res) => {
  try {
    const producto = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    await agregarCarrito(id, producto);
    console.log(
      `El usuario ${email} con el id ${id} ha agregado un producto al carrito`
    );
    res.status(201).json({ Mensaje: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarrito = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    const carrito = await consultarCarrito(id);
    console.log(`El usuario ${email} con el id ${id} ha consultado el carrito`);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductoCarrito = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    await eliminarProducto(id, idProducto);
    console.log(
      `El usuario ${email} con el id ${id} ha eliminado un producto del carrito`
    );
    res.status(200).json({
      message: "Producto eliminado del carrito",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ventaRealizada = async (req, res) => {
  try {
    const { idProducto, cantidad } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    await venta(id, idProducto, cantidad);
    console.log(`El usuario ${email} ha realizado una compra`);
    res.status(200).json({ mensaje: "compra realizada" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  agregarProducto,
  añadirProductoCarrito,
  getProductosByCategoria,
  getCarrito,
  deleteProductoCarrito,
  ventaRealizada,
  modifyProducto,
  getAllProducts
};
