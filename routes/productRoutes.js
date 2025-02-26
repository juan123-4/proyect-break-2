const express = require("express");
const router = express.Router();
const { showProducts,showDashboard,filterProducts,filterProductsPrincipal,showProductsForPrincipal, showProductById,showProductByIdPrincipal , showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct } = require('../controllers/productController');


router.post("/dashboard", createProduct ); //Crea un nuevo producto.
router.get("/api/products", showProductsForPrincipal);//Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle en la pagina principal
router.get("/principal/:productId", showProductByIdPrincipal);//Devuelve el detalle de un producto en la pagina principal
router.get("/products",showProducts ); //Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/dashboard/new", showNewProduct);//Devuelve la vista con el formulario para subir un artículo nuevo
router.get("/dashboard/:productId", showProductById); //Devuelve el detalle de un producto en el dashboard.
router.get("/product",showDashboard);//Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get("/edit/:productId", showEditProduct); //Devuelve el formulario para editar un producto.
router.post("/dashboard/:productId/update", updateProduct);; ////Actualiza un producto. 
router.post("/dashboard/:productId/delete", deleteProduct); //Elimina un producto.

//filtrado
router.get("/products/filter", filterProducts);//Filtra por categorias en el dashboard
router.get("/product/filter_principal", filterProductsPrincipal);//Filtra por categorias en la pagina principal

module.exports = router;

 





