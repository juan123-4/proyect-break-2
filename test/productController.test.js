const { showProducts,showDashboard,filterProducts,filterProductsPrincipal,showProductsForPrincipal, showProductById,showProductByIdPrincipal , showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct } = require('../controllers/productController');
createProduct
//intente pero no me de por la autentificacion y me redirige a register
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
require('dotenv').config();


//Conecta a ddbb antes de ejecutar los tests.
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
//cerrar la conexion de la ddbb despues del test
afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /dashboard', () => {
    it('should create a new product', async () => {
        const token = await login('test@example.com', 'password');
        const newPost = {
            nombre: 'Camiseta de colombia',
            descripcion: 'Camiseta de colombia con el numero 10 del año 2005',
            imagen: 'https://imbictoz.com/wp-content/uploads/2024/04/camiseta-colombia-2025.jpg',
            categoria: 'Camisetas',
            talla: 'Xl',
            precio: 60
        };

        const response = await request(app).post('/dashboard').send(newPost);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        
        });
  
      
      expect(response.status).toBe(201); 
      expect(response.body).toHaveProperty('_id');
        
    });

    it('should throw an error if name or something are null', async () => {
        const newPost = {
            nombre: 'pantalon'
        };

        const response = await request(app).post('/dashboard').send(newPost);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'All are required');
    });


//NO me funciona porque necesito que me devuelva en formato json y todo lo tengo en html
describe('GET /products', () => {
  it('should return a list of products', async () => {
   const response = await request(app).get('/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('_id');
    }
  });

  it('should return an empty array if no products are available', async () => {
    await mongoose.connection.db.collection('products').deleteMany({});
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});



