module.exports = {
    paths: {
      '/dashboard': {
        post: {
          tags: ['Productos'],
          description: 'Crear un nuevo producto',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ropa'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Producto creado con éxito'
            },
            '400': {
              description: 'Error en la solicitud'
            }
          }
        }
      }
    }
  };
  