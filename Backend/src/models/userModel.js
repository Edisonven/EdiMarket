const z = require("zod");
const bcrypt = require("bcryptjs");
const format = require("pg-format");
const db = require("../config/database");

const validarUsuario = z.object({
  nombre: z.string().min(3),
  email: z.string().email(),
  contraseña: z.string().min(8),
});
const validarUser = z.object({
  email: z.string().email(),
  contraseña: z.string().min(8),
});

const validarProducto = z.object({
  nombre: z.string().min(3),
  descripcion: z.string().min(0),
  precio: z.number().min(0),
  stock: z.number().min(0),
  imagen: z.string().min(3),
  categoria: z.string().min(3),
});

const validarDomicilio = z.object({
  direccion: z.string().min(3),
  ciudad: z.string().min(3),
  region: z.string().min(3),
  codigo_postal: z.string().min(3),
  numero_casa: z.string().min(0),
  comuna: z.string().min(3),
});

const validarMetodoDePago = z.object({
  tipo_tarjeta: z.string().min(3),
  numero_tarjeta: z.string().min(3),
  nombre_titular: z.string().min(3),
  fecha_expiracion: z.string().min(3),
  codigo_seguridad: z.string().min(3),
});

const consultarUsuario = async () => {
  const consulta = "SELECT * FROM usuarios";
  const { rows: users } = await db.query(consulta);
  return users;
};
const consultarUsuarioById = async (id) => {
  const consulta = "SELECT * FROM usuarios WHERE id=$1";
  const { rows: users } = await db.query(consulta, [id]);
  return users.map((user) => {
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
    };
  });
};

const registrarUsuario = async (usuario) => {
  const databaseUser = await consultarUsuario();
  let { nombre, email, contraseña } = usuario;
  if (databaseUser.find((user) => user.email === email)) {
    throw new Error("El usuario ya existe");
  }
  validarUsuario.parse(usuario);
  const hashedPassword = bcrypt.hashSync(contraseña);
  contraseña = hashedPassword;
  const values = [nombre, email, hashedPassword];
  const consulta = format(
    "INSERT INTO usuarios (id,nombre, email, contraseña) VALUES (DEFAULT, $1, $2, $3)",
    values
  );
  const { rows: user } = await db.query(consulta, values);
  return user;
};

const eliminarUsuario = async (id) => {
  const values = [id];
  const consulta = "DELETE FROM usuarios WHERE id=$1";
  await db.query(consulta, values);
  return console.log("Usuario eliminado");
};

const verificarUsuario = async (email, contraseña) => {
  const values = [email];
  validarUser.parse({ email, contraseña });
  const consulta = "SELECT * FROM usuarios WHERE email=$1";
  const { rows } = await db.query(consulta, values);
  const user = rows[0];
  const passwordVerified = bcrypt.compareSync(contraseña, user.contraseña);
  if (!passwordVerified)
    throw { code: 401, message: "El usuario o contraseña no coinciden" };
  return user;
};
const consultarProductos = async () => {
  const consulta =
    "SELECT * from productos inner join producto_categoria on productos.id=producto_categoria.producto_id inner join categorias on producto_categoria.categoria_id=categorias.id";
  const { rows: products } = await db.query(consulta);
  return products;
};

const consultarProductosByCategoria = async (categoria) => {
  const values = [categoria];
  const consulta =
    "SELECT * from productos inner join producto_categoria on productos.id=producto_categoria.producto_id inner join categorias on producto_categoria.categoria_id=categorias.id where categorias.nombre_categoria=$1";
  const { rows: products } = await db.query(consulta, values);
  return products;
};

const consultarProductoById = async (id) => {
  const consulta =
    "select * from productos inner join producto_categoria on productos.id=producto_categoria.producto_id inner join categorias on categorias.id=producto_categoria.categoria_id where productos.id=$1";
  const { rows: products } = await db.query(consulta, [id]);
  return products[0];
};

const consultarCategorias = async () => {
  const consulta = "SELECT * FROM categorias";
  const { rows: categorias } = await db.query(consulta);
  return categorias;
};

const idCategoria = async (categoria) => {
  const values = [categoria];
  const consulta = "SELECT id FROM categorias WHERE nombre_categoria=$1";
  const { rows } = await db.query(consulta, values);
  return rows[0].id;
};

const registrarProducto = async (producto, vendedor_id) => {
  let { nombre, descripcion, estado, precio, stock, imagen, categoria } =
    producto;
  validarProducto.parse(producto);
  const categoriaId = await idCategoria(categoria);
  const id = Math.floor(Math.random() * 9999999);
  const valuesCategoria = [id, categoriaId];
  const valuesProducto = [
    id,
    nombre,
    descripcion,
    estado,
    precio,
    stock,
    imagen,
    vendedor_id
  ];
  const consultaProducto =
    "INSERT INTO productos (id,nombre,descripcion,precio,stock,imagen,vendedor_id,estado) VALUES ($1,$2,$3,$5,$6,$7,$8,$4)";
  const consultaCategoria =
    "INSERT INTO producto_categoria (id,producto_id,categoria_id) VALUES (DEFAULT,$1,$2)";
  await db.query(consultaProducto, valuesProducto);
  await db.query(consultaCategoria, valuesCategoria);
  return console.log("Registrado");
};

const agregarDirreccion = async (domicilio, idUsuario) => {
  const domicilios = await consultarDirreccion(idUsuario);
  if (domicilios.length > 0) {
    throw new Error("ya existe una direccion asociada a este usuario");
  } else {
    let { direccion, numero_casa, ciudad, comuna, region, codigo_postal } =
      domicilio;
    validarDomicilio.parse(domicilio);
    const values = [
      idUsuario,
      direccion,
      numero_casa,
      ciudad,
      comuna,
      region,
      codigo_postal,
    ];
    const consulta =
      "INSERT INTO domicilio(id,usuario_id,direccion,ciudad,region,codigo_postal,comuna,numero_casa) VALUES (DEFAULT,$1,$2,$4,$6,$7,$5,$3)";
    await db.query(consulta, values);
    return console.log("Direccion agregada");
  }
};

const agregarMetodoDePago = async (metodoDePago, idUsuario) => {
  let {
    tipo_tarjeta,
    numero_tarjeta,
    nombre_titular,
    fecha_expiracion,
    codigo_seguridad,
  } = metodoDePago;
  const values = [
    idUsuario,
    tipo_tarjeta,
    numero_tarjeta,
    nombre_titular,
    fecha_expiracion,
    codigo_seguridad,
  ];
  validarMetodoDePago.parse(metodoDePago);
  const metodos= await consultarMetodosPago(idUsuario);
  if(metodos.find((metodo)=>metodo.numero_tarjeta==numero_tarjeta)){
    throw new Error("Ya existe un metodo de pago con el mismo numero de tarjeta");
  }
  const consulta =
    "INSERT INTO metodos_pago(id,usuario_id,tipo_tarjeta,numero_tarjeta,nombre_titular,fecha_expiracion,codigo_seguridad) VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)";
  await db.query(consulta, values);
  return console.log("Metodo de pago agregado");
};

const agregarFavorito = async (idProducto, idUsuario) => {
  const values = [idUsuario, idProducto];
  const favoritos = await consultarFavoritos(idUsuario);
  if (favoritos.find((favorito) => favorito.producto_id == idProducto)) {
    throw new Error("El producto ya está en favoritos");
  }
  const consulta =
    "INSERT INTO favoritos(favorito_id,usuario_id,producto_id) VALUES (DEFAULT,$1,$2)";
  await db.query(consulta, values);
  return console.log("Favorito agregado");
};

const borrarFavorito = async (idFavorito, idUsuario) => {
  const values = [idFavorito, idUsuario];
  const favoritos = await consultarFavoritos(idUsuario);
  if (favoritos.find((favorito) => favorito.favorito_id == idFavorito)) {
    const consulta =
      "DELETE FROM favoritos WHERE favorito_id=$1 AND usuario_id=$2";
    await db.query(consulta, values);
    return console.log("Favorito eliminado");
  } else {
    throw new Error("El favorito no existe");
  }
};

const consultarFavoritos = async (idUsuario) => {
  const values = [idUsuario];
  const consulta =
    "select * from usuarios inner join favoritos on usuarios.id=favoritos.usuario_id inner join productos on productos.id=favoritos.producto_id where usuarios.id=$1";
  const { rows: favoritos } = await db.query(consulta, values);
  return favoritos;
};

const consultarMetodosPago = async (idUsuario) => {
  const values = [idUsuario];
  const consulta =
    "select * from usuarios inner join metodos_pago on usuarios.id=metodos_pago.usuario_id where usuarios.id=$1";
  const { rows: metodos } = await db.query(consulta, values);
  return metodos;
};

const consultarDirreccion = async (idUsuario) => {
  const values = [idUsuario];
  const consulta =
    "select * from usuarios inner join domicilio on usuarios.id=domicilio.usuario_id where usuarios.id=$1";
  const { rows: domicilio } = await db.query(consulta, values);
  return domicilio;
};

const agregarCarrito = async (idUsuario, producto) => {
  let {idProducto,cantidad} = producto;

  const values = [idUsuario, idProducto, cantidad];
  const consulta =
    "INSERT INTO carrito(id,usuario_id,producto_id,cantidad,comprado) VALUES (DEFAULT,$1,$2,$3,false)";
  await db.query(consulta, values);
  return console.log("Producto agregado al carrito");
}

module.exports = {
  consultarUsuario,
  consultarUsuarioById,
  registrarUsuario,
  consultarCategorias,
  consultarProductos,
  registrarProducto,
  verificarUsuario,
  consultarProductoById,
  agregarDirreccion,
  consultarDirreccion,
  agregarFavorito,
  consultarFavoritos,
  borrarFavorito,
  agregarMetodoDePago,
  consultarMetodosPago,
  eliminarUsuario,
  agregarCarrito,
  consultarProductosByCategoria
};
