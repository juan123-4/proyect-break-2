
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

        // Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyDF6mw2qj6U5x1mzCCccJNYgophcGxyBWY",
            authDomain: "proyect-break-2.firebaseapp.com",
            projectId: "proyect-break-2",
            storageBucket: "proyect-break-2.appspot.com",
            messagingSenderId: "1048027542901",
            appId: "1:1048027542901:web:866f4c8e435c77b5e94f3c"
        };

        // Inicializar Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const login = async (event) => {
            event.preventDefault();
            try {
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
                const mensajeLogin = document.getElementById("mensajeLogin");

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ idToken }) 
                });

                const data = await response.json();
                if (data.success) {
                    window.location.href = "/dashboard";
                } else {
                    mensajeLogin.textContent = "No se ha podido realizar el login de usuario.";
                }
            } catch (error) {
                console.error("Error en el inicio de sesión:", error.message);
            }
        };

        document.getElementById("Loginbutton").addEventListener("click", login);

//////dashboard

console.log("✅ El archivo principal.js se está ejecutando");
async function cargarProductos() {
    try {
        console.log("📡 Solicitando productos...");
        const respuesta = await fetch("/products"); // Asegúrate de que devuelve HTML válido
        
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

document.addEventListener("DOMContentLoaded", cargarProductos);
        


   
