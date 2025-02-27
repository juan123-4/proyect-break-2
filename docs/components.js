module.exports = {
    components: {
      schemas: {
        Ropa: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              required: 'true' ,
              description: 'Nombre del producto'
            },
            descripcion: {
              type: 'boolean',
              required: 'true' ,
              description: 'Descripcion del producto'
            },
            imagen: {
                type: 'string',
                required: 'true' ,
                description: 'Imagen del producto'
              },
            categoria: {
                type: 'string',
                required: 'true' ,
                description: 'Categoria del producto'
              },
            talla: {
                type: 'string',
                required: 'true' ,
                description: 'Talla del producto'
              },
            precio: {
                type: 'number',
                required: 'true' ,
                description: 'precio del producto'
              },
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Elemento no encontrado'
        }
      }
    }
  };
  