//! Rutas del CRUD de tareas.

const express = require("express");
const router = express.Router();
const { showProducts,showDashboard,filterProducts,filterProductsPrincipal,showProductsForPrincipal, showProductById,showProductByIdPrincipal , showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// POST /dashboard: Endpoint para crear una publicación.

router.post("/dashboard", createProduct ); 
router.get("/api/products", showProductsForPrincipal);
router.get("/principal/:productId", showProductByIdPrincipal);


router.get("/products",showProducts );  //GET /products:Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

// Ruta para mostrar el formulario de nuevo producto
router.get("/dashboard/new", showNewProduct);
// GET /: Endpoint para traer todas las publicaciones.
router.get("/dashboard/:productId", showProductById); //GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.




// GET /id/:_id: Endpoint para buscar publicación por id.
router.get("/product",showDashboard); //GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.

// GET /title/:title: Endpoint para buscar una publicación por su titulo.
//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.


// PUT /id/:_id: Endpoint para actualizar una publicación.
router.get("/dashboard/:productId/edit", showEditProduct); // Ruta para mostrar el formulario de edición
router.post("/dashboard/:productId/update", updateProduct);; //GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.


// DELETE /id/:_id: Endpoint para eliminar una publicación.
router.post("/dashboard/:productId/delete", deleteProduct); //DELETE /dashboard/:productId/delete: Elimina un producto.

//filtrado
router.get("/products/filter", filterProducts);
router.get("/products/filter/principal", filterProductsPrincipal);

module.exports = router;

 





