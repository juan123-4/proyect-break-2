const Ropa = require('../models/product');
const mongoose = require('mongoose');

// Devuelve  todos los productos **
const showProducts = async (req, res) => {
    try {
        const products = await Ropa.find();
        const productCards = getProductCardsProducts(products);
        const html = baseHtml + getNavBar() + productCards;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};
//esto solo es para la principal.html pero sin el getNavBar()
const showProductsForPrincipal = async (req, res) => {
    try {
        const products = await Ropa.find();
        const productCards = getProductCardsPrincipal(products);
        const html = baseHtml +  productCards;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};

// Devuelve la vista con el detalle de un producto **
const showProductById = async (req, res) => {
    
        try {
            const id = String(req.params.productId).trim(); // Asegurar que sea un String limpio
            
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
    
            const product = await Ropa.findById(id);
    
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
    
            const productCard = getProductCard(product);
            const html = baseHtml + getNavBar() + productCard;
            res.send(html);
        } catch (error) {
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: 'No se pudo obtener el artículo de ropa' });
        }
    };
//esto solo es para la principal.html pero sin el getNavBar()
    const showProductByIdPrincipal = async (req, res) => {
    
        try {
            const id = String(req.params.productId).trim(); 
            
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
    
            const product = await Ropa.findById(id);
    
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
    
            const productCard = ComeBack(product);
            const html = baseHtml + getNavBarPrincipal() + productCard;
            res.send(html);
        } catch (error) {
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: 'No se pudo obtener el artículo de ropa' });
        }
    };
    

// Devuelve la vista con el formulario para subir un artículo nuevo 
const showNewProduct = (req, res) => {
    const html = baseHtml + getNavBar() + getNewProductForm()+ `</body></html>`;
    res.send(html);
};

// Crea un nuevo producto**
const createProduct = async (req, res) => {
    const { nombre, descripcion, imagen, categoria, talla, precio } = req.body;
    try {
        const nuevaRopa = new Ropa({ nombre, descripcion, imagen, categoria, talla, precio });
        await nuevaRopa.save();
        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el artículo de ropa' });
    }
};

// Devuelve la vista con el formulario para editar un producto **
const showEditProduct = async (req, res) => {
    try {
        const product = await Ropa.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const editProductForm = getEditProductForm(product);
        const html = baseHtml + getNavBar() + editProductForm;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el artículo de ropa para editar' });
    }
};

// Actualiza un producto **

const updateProduct = async (req, res) => {
const { nombre, descripcion, imagen, categoria, talla, precio } = req.body;
    try {
        const updatedProduct = await Ropa.findByIdAndUpdate(
            req.params.productId,
            { nombre, descripcion, imagen, categoria, talla, precio },
            { new: true }
        );

        if (!updatedProduct) {
            console.log("Producto no encontrado en la base de datos"); 
            return res.status(404).send("Producto no encontrado");
        }
        res.redirect(`/edit/${updatedProduct._id}`);
        
       
       
    } catch (error) {
        console.error("Error en la actualización:", error); 
        res.status(500).send("No se pudo actualizar el artículo de ropa");
    }
};



// Elimina un producto **
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
         
        const deletedProduct = await Ropa.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).send('Producto no encontrado' );
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('No se pudo eliminar el artículo de ropa' );
    }
};

// Funciones auxiliares


function getProductCards(products) {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <a href="/dashboard/${product._id}">
                    <button>Ver detalle</button>
                </a>
            </div>
            <div id="info-${product._id}" class="product-info" style="display: none;"></div>
        `;
    }
    return html;
}
function getProductCardsProducts(products) {
    
    let html = '<h1>Productos</h1><div class="product-container">';
    for (let product of products) {
        html += `
        
            <div class="product-card">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <a href="/dashboard/${product._id}">
                    <button>Ver detalle</button>
                </a>
            </div>
            <div id="info-${product._id}" class="product-info" style="display: none;"></div>
        `;
    }
    html += '</div>'; 
    return html;
}
function getProductCardsFilter(products) {
    
    let html = '<h1>Productos</h1><div class="product-container">';
    for (let product of products) {
        html += `
        
            <div class="product-card">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <a href="/principal/${product._id}">
                    <button>Ver detalle</button>
                </a>
            </div>
            <div id="info-${product._id}" class="product-info" style="display: none;"></div>
        `;
    }
    html += '</div>'; 
    return html;
}


function getProductCardsPrincipal(products) {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <a href="/principal/${product._id}">
                    <button>Ver detalle</button>
                </a>
            </div>
            <div id="info-${product._id}" class="product-info" style="display: none;"></div>
        `;
    }
    return html;
}





// Devuelve el dashboard del administrador con todos los productos
const showDashboard = async (req, res) => {
    try {
        const products = await Ropa.find();
        const productCards = getProductCards(products);
        const html = baseHtml + getDashboard(productCards);
        res.send(html);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};


// Función auxiliar para generar el HTML del dashboard
function getDashboard(productCards) {
    return `
            <div id="product-list">
                ${productCards}
            </div>
        
    `;
}

//Formulario para la creacion de un producto
function getNewProductForm() {
    return `
    <h1>crear Producto</h1>
    <div class="ventana-contenedor_crear">
        <div class="ventana_crear">
        <form action="/dashboard" method="POST">
            
            <label for="nombre">Nombre:</label>
            </br>
            <input type="text" id="nombre" name="nombre" required>
            </br></br>
            
            <label for="descripcion">Descripción:</label>
            </br>
            <textarea id="descripcion" name="descripcion" required></textarea>
            </br></br>

            <label for="imagen">Imagen URL:</label>
            </br>
            <input type="text" id="imagen" name="imagen" required oninput="previewImage()">
            <img id="preview" src="" alt="Vista previa" style="display:none; width: 150px; margin-top: 10px;">
            </br></br>
            
           <label for="categoria">Categoría:</label>
           </br>
            <select id="categoria" name="categoria" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            </br></br>

            <label for="talla">Talla:</label>
            </br>
            <select id="talla" name="talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            </br></br>

            <label for="precio">Precio:</label>
            </br>
            <input type="number" id="precio" name="precio" required>
            </br></br></br>

            <button type="submit" id="boton_crear">Crear Producto</button>
            </br>
        </form>
        </div>
    </div>
    `;
}
//Funcion que ayuda a convertir el input donde se coloca el url en la imagen soicitada

function previewImage() {
    const input = document.getElementById("imagen");
    const preview = document.getElementById("preview");

    if (input.value) {
        preview.src = input.value;
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }
}
 

//Formulario para la edicion de un producto
function getEditProductForm(product) {
    return `
    <h1>Editar Producto</h1>
    <div class="ventana-contenedor_editar">
        <div class="ventana_editar">
        <form action="/dashboard/${product._id}/update" method="post">

            <label for="nombre">Nombre:</label>
            </br>
            <input type="text" id="nombre" name="nombre" value="${product.nombre}" required>
            </br></br>

            
            <label for="descripcion">Descripción:</label>
            </br>
            <textarea id="descripcion" name="descripcion" required>${product.descripcion}</textarea>
            </br></br>

            <label for="imagen">Imagen URL:</label>
            </br>
            <input type="text" id="imagen" name="imagen" value="${product.imagen}" required>
            </br></br>

            <label for="categoria">Categoría:</label>
            </br>
            <input type="text" id="categoria" name="categoria" value="${product.categoria}" required>
            </br></br>

            <label for="talla">Talla:</label>
            </br>
            <input type="text" id="talla" name="talla" value="${product.talla}" required>
            </br></br>


            <label for="precio">Precio:</label>
            </br>
            <input type="number" id="precio" name="precio" value="${product.precio}" required>
            </br></br>


            <button type="submit">Guardar</button>
            </form>
            <a href="/dashboard"><button id="despegar">Inicio</button></a>
            </br>
        </div>
    </div>
            
    `;
}

//variable que contiene la estructura inicial de un documento HTML
const baseHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tienda de Ropa</title>
        <link rel="stylesheet" href="../style.css">
    </head>
    <body>
`;

//Función auxiliar para generar el HTML de la barra de navegación
 function getNavBar() {
    return `
        <header class="encabezado">
        
            <li><a href="/products">Productos</a></li>
            <li><a href="/products/filter?categoria=Camisetas">camisetas</a></li>
            <li><a href="/products/filter?categoria=Pantalones">Pantalones</a></li>
            <li><a href="/products/filter?categoria=Zapatos">zapatos</a></li>
            <li><a href="/products/filter?categoria=Accesorios">Accesorios</a></li>
            <li><a href="/dashboard/new">Nuevo Producto</a></li>
        
        <form action="/logout" method="post">
            <li><a href=""> <button type="submit" id="cerrar">logout</button></a></li>
        </form>
       
        </header>
   `;
}

//Función auxiliar para generar el HTML de la barra de navegación en la pagina principal
function getNavBarPrincipal() {
    return `
        <header class="encabezado">
            <li><a href="/">Productos</a></li>
            <li><a href="/product/filter_principal?categoria=Camisetas">camisetas</a></li>
            <li><a href="/product/filter_principal?categoria=Pantalones">Pantalones</a></li>
            <li><a href="/product/filter_principal?categoria=Zapatos">zapatos</a></li>
            <li><a href="/product/filter_principal?categoria=Accesorios">Accesorios</a></li>
            <li><a href="/register">Iniciar sesion </a></li>
            <li><a href="/login">login</a></li>
       
        </header>

   `;
}

//funcion para mostrar los elementos de el producto
function getProductCard(product) {
    return `
        <div class="product-conta_ventana">
            <div class="product-ventana">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}" id="foto">
                <p>${product.descripcion}</p>
                <p>${product.precio}€</p>
                <p>Categoría: ${product.categoria}</p>
                <p>Talla: ${product.talla}</p>

                <form action="/dashboard/${product._id}/update" method="POST">
                    <button type="submit" id="button-ventana"
                    onclick="return confirm('¿Seguro que quieres editar este producto?')">Editar</button>
                </form>

                <form action="/dashboard/${product._id}/delete" method="POST" 
                    onsubmit="return confirm('¿Seguro que quieres eliminar este producto?')">
                    <button type="submit" id="button-ventana">Borrar</button>
                </form>
            </div>
        </div>
    `;
}

function ComeBack(product) {
    return `
    <div class="product-conta_ventana">
        <div class="product-ventana">
            <h2>${product.nombre}</h2>
            <img src="${product.imagen}" alt="${product.nombre} " id="foto">
            <p>${product.descripcion}</p>
            <p>${product.precio}€</p>
            <p>Categoría: ${product.categoria}</p>
            <p>Talla: ${product.talla}</p>
            
        </div>
     </div>
    `;
}

//funcion de filtrado de categorias
const filterProducts = async (req, res) => {
    try {
       
        const { categoria } = req.query;
        const products = await Ropa.find();
        const filteredProducts = products.filter(product => product.categoria === categoria);
        const productCards = getProductCardsProducts(filteredProducts);
        const html = baseHtml + getNavBar() + productCards +`</body></html>`;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};

//funcion de filtrado de categorias en la pagina principal
const filterProductsPrincipal = async (req, res) => {
    try {
        
        const { categoria } = req.query;
        const products = await Ropa.find();
        const filteredProducts = products.filter(product => product.categoria === categoria);
        const productCards = getProductCardsFilter(filteredProducts)
        const html = baseHtml + getNavBarPrincipal() + productCards;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};


module.exports = { showProducts,showProductsForPrincipal ,showProductById,filterProducts,filterProductsPrincipal, showProductByIdPrincipal ,showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct,showDashboard};
