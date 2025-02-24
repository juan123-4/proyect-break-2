//models product
const mongoose = require('mongoose');

const RopaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String, // Aqui es donde se almacena la URL de la imagen
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Ropa = mongoose.model('Ropa', RopaSchema);

module.exports = Ropa;
