const request = require('supertest');
const server = require('../src/app.js');

jest.mock('../src/controllers/userController', () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  registrarUser: jest.fn(),
  loginUser: jest.fn(),
  agregarDomicilio: jest.fn(),
  consultarDomicilio: jest.fn(),
  agregarPaymentMethod: jest.fn(),
  consultarPaymentMethods: jest.fn(),
  deleteUser: jest.fn(),
  consultarCategoria: jest.fn(),
  addFavorito: jest.fn(),
  consultarFavorito: jest.fn(),
  deleteFav: jest.fn()
}));

// getAllUsers,
// getUserById,
// registrarUser,
// loginUser,
// consultarCategoria,
// agregarDomicilio,
// consultarDomicilio,
// addFavorito,
// consultarFavorito,
// deleteFav,
// agregarPaymentMethod,
// consultarPaymentMethods,
// deleteUser

jest.mock('../src/controllers/productController', () => ({
    getProductosByCategoria: jest.fn(),
    getProductos: jest.fn(),
    getProductoById: jest.fn(),
    agregarProducto: jest.fn(),
    añadirProductoCarrito: jest.fn()
  }));

const { getAllUsers } = require('../src/controllers/userController');

describe("CRUD operations of EdiMarket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return status code 200 and a list of users", async () => {
    getAllUsers.mockImplementation(async (req, res) => {
      const mockUsers = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];
      res.status(200).send(mockUsers);
    });

    const response = await request(server).get("/usuarios");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('User1');
  });

  it("should return status code 500 on server error", async () => {
    getAllUsers.mockImplementation(async (req, res) => {
      throw new Error("Internal Server Error");
    });

    const response = await request(server).get("/usuarios");
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});
