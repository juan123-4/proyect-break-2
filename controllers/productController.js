const Ropa = require('../models/product');

const mongoose = require('mongoose');

// Devuelve  todos los productos **
const showProducts = async (req, res) => {
    try {
        const products = await Ropa.find();
        console.log("Productos en la base de datos:", products);
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
        console.log("Productos en la base de datos:", products);
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
            console.log("ID recibido en la petición:", id);
    
    
            // Validar si el ID es correcto
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
            const id = String(req.params.productId).trim(); // Asegurar que sea un String limpio
            console.log("ID recibido en la petición:", id);
    
    
            // Validar si el ID es correcto
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID no válido' });
            }
    
            const product = await Ropa.findById(id);
    
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
    
            const productCard = ComeBack(product);
            const html = baseHtml +  productCard;
            res.send(html);
        } catch (error) {
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: 'No se pudo obtener el artículo de ropa' });
        }
    };
    

// Devuelve la vista con el formulario para subir un artículo nuevo **
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
    console.log("ID recibido:", req.params.productId); // 👀 Verificar si el ID está llegando correctamente
    console.log("Datos recibidos:", req.body); // 👀 Verificar los datos enviados

    const { nombre, descripcion, imagen, categoria, talla, precio } = req.body;
    try {
        const updatedProduct = await Ropa.findByIdAndUpdate(
            req.params.productId,
            { nombre, descripcion, imagen, categoria, talla, precio },
            { new: true }
        );

        if (!updatedProduct) {
            console.log("Producto no encontrado en la base de datos"); // 👀
            return res.status(404).send("Producto no encontrado");
        }

        console.log("Producto actualizado:", updatedProduct); // 👀
        res.redirect(`/dashboard/${updatedProduct._id}/edit/`);
       
       
    } catch (error) {
        console.error("Error en la actualización:", error); // 👀
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
    let html = '';
    for (let product of products) {
        html += `
        <div class="total">
            <div class="product-card">
                <h2>${product.nombre}</h2>
                <img src="${product.imagen}" alt="${product.nombre}">
                <a href="/dashboard/${product._id}">
                    <button>Ver detalle</button>
                </a>
            </div>
            <div id="info-${product._id}" class="product-info" style="display: none;"></div>
        </div>
        `;
    }
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
        console.log("Productos encontrados en la BD:", products); // 🧐 Verificar productos obtenidos

        const productCards = getProductCards(products);
        console.log("HTML generado para las tarjetas:", productCards); // ⚠️ Ver si se está generando correctamente

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


function getNewProductForm() {
    return `
        <form action="/dashboard" method="POST">
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required></textarea>
            
            <label for="imagen">Imagen URL:</label>
            <input type="text" id="imagen" name="imagen" required oninput="previewImage()">
            <img id="preview" src="" alt="Vista previa" style="display:none; width: 150px; margin-top: 10px;">

            
           <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>

            <label for="talla">Talla:</label>
            <select id="talla" name="talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>

            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" required>
            
            <button type="submit">Crear Producto</button>
        </form>
    `;
}

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

function getEditProductForm(product) {
    return `
        <form action="/dashboard/${product._id}/update" method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${product.nombre}" required>
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required>${product.descripcion}</textarea>
            <label for="imagen">Imagen URL:</label>
            <input type="text" id="imagen" name="imagen" value="${product.imagen}" required>
            <label for="categoria">Categoría:</label>
            <input type="text" id="categoria" name="categoria" value="${product.categoria}" required>
            <label for="talla">Talla:</label>
            <input type="text" id="talla" name="talla" value="${product.talla}" required>
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" value="${product.precio}" required>
            <button type="submit">Actualizar Producto</button>
            <a href="/"><button>Inicio</button></a>        </form>
    `;
}


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
            <li><a href="/products/filter/principal?categoria=Camisetas">camisetas</a></li>
            <li><a href="/products/filter/principal?categoria=Pantalones">Pantalones</a></li>
            <li><a href="/products/filter/principal?categoria=Zapatos">zapatos</a></li>
            <li><a href="/products/filter/principal?categoria=Accesorios">Accesorios</a></li>
            <li><a href="/dashboard/new">Nuevo Producto</a></li>
        <form action="/logout" method="post">
            <li><a href=""> <button type="submit" id="cerrar">logout</button></a></li>
        </form>
       
        </header>
   `;
}


function getProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>${product.precio}€</p>
            <p>Categoría: ${product.categoria}</p>
            <p>Talla: ${product.talla}</p>
            
            <form action="/dashboard/${product._id}/delete" method="POST" 
                onsubmit="return confirm('¿Seguro que quieres eliminar este producto?')">
                <button type="submit">Borrar</button>
            </form>

           <form action="/dashboard/${product._id}/update" method="POST">
                <button type="submit" 
                onclick="return confirm('¿Seguro que quieres editar este producto?')">Editar</button>
            </form>

            
            
        </div>
    `;
}

function ComeBack(product) {
    return `
        <div class="product-card">
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>${product.precio}€</p>
            <p>Categoría: ${product.categoria}</p>
            <p>Talla: ${product.talla}</p>
            <li><a href="/products/filter/principal?categoria=Camisetas">camisas</a></li>
            <li><a href="/products/filter/principal?categoria=Zapatos">zapatos</a></li>
            <a href="/"><button>Iinicio</button></a>
        </div>
    `;
}

const filterProducts = async (req, res) => {
    try {
        // Obtener la categoría de los parámetros de la solicitud (en este caso, usando `req.query`)
        const { categoria } = req.query;

        // Obtener todos los productos
        const products = await Ropa.find();

        // Filtrar los productos por la categoría especificada
        const filteredProducts = products.filter(product => product.categoria === categoria);

        // Generar las tarjetas de productos filtrados
        const productCards = getProductCards(filteredProducts);

        // Generar el HTML y enviarlo
        const html = baseHtml + getNavBar() + productCards;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};



const filterProductsPrincipal = async (req, res) => {
    try {
        // Obtener la categoría de los parámetros de la solicitud (en este caso, usando `req.query`)
        const { categoria } = req.query;

        // Obtener todos los productos
        const products = await Ropa.find();

        // Filtrar los productos por la categoría especificada
        const filteredProducts = products.filter(product => product.categoria === categoria);

        // Generar las tarjetas de productos filtrados
        const productCards = filteredProducts.map(ComeBack).join(""); 

        // Generar el HTML y enviarlo
        const html = baseHtml + productCards;
        res.send(html);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener los artículos de ropa' });
    }
};


module.exports = { showProducts,showProductsForPrincipal ,showProductById,filterProducts,filterProductsPrincipal, showProductByIdPrincipal ,showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct,showDashboard};
