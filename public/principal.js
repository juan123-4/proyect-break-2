console.log("✅ El archivo principal.js se está ejecutando");

async function cargarProductos() {
    try {
        // Realiza la petición GET a la API
        const respuesta = await fetch("/api/products");
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productosHTML = await respuesta.text(); // Convierte la respuesta a texto (HTML)
        const contenedor = document.getElementById("productos"); 

        if (!contenedor) {
            console.error("Error: No se encontró el contenedor #productos");
            return;
        }


        contenedor.innerHTML = productosHTML;
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}



cargarProductos();



//////dashboard
//router.get("/product",showDashboard);router.get("/product",showDashboard);
//No me cogia con otro nombre
// Es para mostrar los productos porque de otras maneras no me funcionaban


async function cargarProductosDashboard() {
    try {
        
        const respuesta = await fetch("/product"); 
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productosHTML = await respuesta.text();
        const contenedor = document.getElementById("product-list");
        if (!contenedor) {
            console.error("No se encontró el contenedor #product-list");
            return;
        }

        contenedor.innerHTML = productosHTML;
    } catch (error) {
        console.error("Error al cargar productos:", error);
        document.getElementById("product-list").innerHTML = "No se pudieron cargar los productos.";
    }
}

document.addEventListener("DOMContentLoaded", cargarProductosDashboard);
        


   
