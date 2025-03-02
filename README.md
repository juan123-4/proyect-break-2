Archivo de explicacion de proyecto  https://github.com/TheBridge-FullStackDeveloper/backend-project-break?tab=readme-ov-file

CONFIG
//db.js
Este código sirve para establecer una conexión con una base de datos MongoDB utilizando Mongoose.

//firebase.js
utilizando las variables de entorno almacenadas en .env. Este objeto serviceAccount es generalmente utilizado para la autenticación

CONTROLLERS
//productController.js
ahi tengo todas las funciones que me ayudan a mostrar los productos,buscar por el id con su informacion,editar y eliminar en la pagina de inicio y el dashboard

MIDDLEWARES
//authMiddleware.js
Es para verificar la autenticidad del token de ID de Firebase almacenado en una cookie.

MODELS
//product.js
Es donde esta definido  el esquema y modelos para estructurar los datos.
mongoose.model('Ropa', RopaSchema) crea un modelo llamado Ropa, basado en RopaSchema.

type: String: Indica que el campo debe ser una cadena de texto.
type: number: Indica que el campo debe ser un numero.
required: true: Significa que el campo es obligatorio.

El esquema contiene los siguientes campos:

nombre: Nombre del producto.
descripcion: Descripción del producto.
imagen: URL de la imagen del producto.
categoria: Categoría a la que pertenece el producto (ej. "Camisetas", "Pantalones").
talla: Tamaño de la prenda (ej. "M", "L", "XL").
precio: Precio del producto como un número.

timestamps: true agrega automáticamente dos campos:

createdAt: Fecha de creación del documento.
updatedAt: Fecha de la última actualización.

PUBLIC
//dashboard.html
donde estan las rutas de enlaces,y el contenedor  <div id="product-list"></div> donde se almacenan los productos que aparecen en el dashboard

//login.html
Es donde esta los input de email y contraseña previamente registrados para poder ser logados a el dashboard

//Principal.html
donde estan las rutas de enlaces,y el contenedor  <div id="productos"></div> donde se almacenan los productos que aparecen en la pagina principal

//register
Es donde nos registramos para crear un usuario que sera usado al ingresarlo en login para poder ingresar a el dashboard

//controll_login.js
Obtiene el correo electrónico y la contraseña del formulario de inicio de sesión.
Utiliza signInWithEmailAndPassword para autenticar al usuario con Firebase.
Obtiene el token de ID del usuario autenticado y lo envía al servidor.
Si la autenticación es exitosa, redirige al usuario al dashboard. Si falla, muestra un mensaje de error.
Verifica que las configuraciones de Firebase sean correctas y que la inicialización se realice sin errores.
Verifica que los IDs de los elementos en el HTML (email, password, mensajeLogin, Loginbutton) sean correctos.
Asegúrate de que el servidor esté configurado para manejar las solicitudes POST en /login y verificar el token de Firebase.

//principal.js
Realiza la petición GET a la API /api/products para obtener todos los productos en la pagina principal
y tambien realiza la petición GET a la API /product para obtener todos los productos en el dashboard

ROUTES
//authRoutes.js
initializeApp: Inicializa la aplicación Firebase con la configuración proporcionada.
getAuth: Obtiene la instancia de autenticación.
signInWithEmailAndPassword: Método para iniciar sesión con correo electrónico y contraseña.

Obtiene el correo electrónico y la contraseña del formulario de inicio de sesión.
Utiliza signInWithEmailAndPassword para autenticar al usuario con Firebase.
Obtiene el token de ID del usuario autenticado y lo envía al servidor.
Si la autenticación es exitosa, redirige al usuario al dashboard. Si falla, muestra un mensaje de error.

//productRoutes.js
Es donde se encuentran todas las rutas

-router.post("/dashboard", createProduct ); //Crea un nuevo producto.
-router.get("/api/products", showProductsForPrincipal);//Devuelve todos los productos. Cada producto tendrá un      enlace a su página de detalle en la pagina principal
-router.get("/principal/:productId", showProductByIdPrincipal);//Devuelve el detalle de un producto en la pagina principal
-router.get("/products",showProducts ); //Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
-router.get("/dashboard/new", showNewProduct);//Devuelve la vista con el formulario para subir un artículo nuevo
-router.get("/dashboard/:productId", showProductById); //Devuelve el detalle de un producto en el dashboard.
-router.get("/product",showDashboard);//Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
-router.get("/edit/:productId", showEditProduct); //Devuelve el formulario para editar un producto.
-router.post("/dashboard/:productId/update", updateProduct);; ////Actualiza un producto. 
-router.post("/dashboard/:productId/delete", deleteProduct); //Elimina un producto.

//filtrado
-router.get("/products/filter", filterProducts);//Filtra por categorias en el dashboard
-router.get("/product/filter_principal", filterProductsPrincipal);//Filtra por categorias en la pagina principal

TEST
son utilizados para asegurar que el código de la aplicación funciona correctamente y que se comporta como se espera

//.env 
donde se encuentran Variables Relacionadas con Firebase, el puerto,Variable Relacionada con MongoDB que no quiero que vean.

//.gitignore
Ahi coloco las cosas que quiero que esconda para cuando lo suba a github no aparezcan visibles

INDEX.js
Es donde se encuentra todo,para cuando el servidor se lanze pueda pasar y leer las variables

// Middleware
-app.use(express.static(path.join(__dirname, "public"))); Esta línea de código configura el middleware para servir archivos estáticos como HTML, CSS, JavaScript e imágenes desde el directorio public.

-app.use(express.json());Este middleware parsea (analiza) el cuerpo de las solicitudes entrantes con formato JSON y convierte los datos en un objeto JavaScript accesible desde req.body.

-app.use(express.urlencoded({ extended: true }));Este middleware parsea el cuerpo de las solicitudes entrantes con datos codificados en URL (formato de formulario) y convierte los datos en un objeto JavaScript accesible desde req.body.

Parámetro extended:
true: Utiliza la biblioteca qs para analizar datos complejos y anidados.
false: Utiliza la biblioteca querystring para analizar datos simples.

-app.use(cookieParser()); Este middleware parsea las cookies adjuntas en las solicitudes del cliente y las coloca en el objeto req.cookies.Si una cookie de nombre token se envía con la solicitud, puedes acceder a req.cookies.token.

-app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(docs))
Sirve para habilitar la documentación de Swagger en tu servidor Express y exponerla en la ruta http://localhost:3000/api-docs.

//// Usa el enrutador para manejar las rutas
app.use("/", router); //authRoutes.js
app.use("/", routes) //productRoutes.js

//dbConnection(); //iniciando la conexión con MongoDB.


//app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
Inicia el servidor y lo pone a escuchar en un puerto especificado



//const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
para que puedas utilizar servicios administrativos de Firebase como la autenticación, la base de datos en tiempo real, Firestore, entre otros.


//RENDER
//https://proyect-break-2.onrender.com


//SWAGGER
//http://localhost:3000/api-docs
