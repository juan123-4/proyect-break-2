console.log("✅ El archivo principal.js se está ejecutando");

async function cargarProductos() {
    try {
        // Realiza la petición GET a la API
        const respuesta = await fetch("/api/products");
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productosHTML = await respuesta.text(); // Convierte la respuesta a texto (HTML)
        console.log("📦 Productos recibidos:", productosHTML); // Ver en consola

        const contenedor = document.getElementById("productos"); // Asegúrate de que este contenedor exista

        if (!contenedor) {
            console.error("❌ Error: No se encontró el contenedor #productos");
            return;
        }

        // Inserta los productos en el HTML
        // contenedor.classList.add("contenedor")
        // contenedor=document.createElement('div');

        contenedor.innerHTML = productosHTML;
    } catch (error) {
        console.error("❌ Error al cargar productos:", error);
    }
}


// Ejecuta la función al cargar la página
cargarProductos();
////dashboard

console.log("✅ El archivo principal.js se está ejecutando");
async function cargarProductosDashboard() {
    try {
        console.log("📡 Solicitando productos...");
        const respuesta = await fetch("/product"); // Asegúrate de que devuelve HTML válido
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productosHTML = await respuesta.text();
        console.log("📦 Productos recibidos:", productosHTML);

        const contenedor = document.getElementById("product-list");

        if (!contenedor) {
            console.error("❌ No se encontró el contenedor #product-list");
            return;
        }

        contenedor.innerHTML = productosHTML;
    } catch (error) {
        console.error("❌ Error al cargar productos:", error);
        document.getElementById("product-list").innerHTML = "No se pudieron cargar los productos.";
    }
}

document.addEventListener("DOMContentLoaded", cargarProductosDashboard);
        


   
