//Inicializa Firebase Admin
const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const app = express();
const PORT = process.env.PORT
const path = require("path");



const { dbConnection } = require('./config/db'); 

const router = require("./routes/authRoutes");
const routes= require("./routes/productRoutes")
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Usa el enrutador para manejar las rutas
app.use("/", router);
app.use("/", routes)


dbConnection(); //iniciando la conexión con MongoDB.

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
