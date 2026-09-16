// URL base de la API pública JSONPlaceholder para realizar las consultas de red
const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Punto 5: Consultar todos los recursos en una petición unificada e integrar
 * la jerarquía completa: Usuario -> Posts -> Comentarios y Usuario -> Álbumes -> Fotos.
 */
export async function consultarYEnriquecerUsuariosCompletos() {
  // Inicio del bloque try para garantizar el control y captura de excepciones
  try {
    // Imprime un mensaje en la terminal notificando el inicio del proceso de consulta
    console.log("\n[Punto 5] Iniciando petición masiva para enriquecer la estructura...");

    // Ejecuta las 5 peticiones HTTP simultáneamente en paralelo para optimizar tiempos
    const [resUsers, resPosts, resComments, resAlbums, resPhotos] = await Promise.all([
      fetch(`${API_URL}/users`),     // Petición 1: Obtiene el arreglo de usuarios
      fetch(`${API_URL}/posts`),     // Petición 2: Obtiene el arreglo de publicaciones
      fetch(`${API_URL}/comments`),  // Petición 3: Obtiene el arreglo de comentarios
      fetch(`${API_URL}/albums`),    // Petición 4: Obtiene el arreglo de álbumes
      fetch(`${API_URL}/photos`)     // Petición 5: Obtiene el arreglo de fotos
    ]);

    // Verifica que todas las respuestas de red contengan un código de estado HTTP exitoso
    if (!resUsers.ok || !resPosts.ok || !resComments.ok || !resAlbums.ok || !resPhotos.ok) {
      // Lanza un error personalizado si alguna de las peticiones HTTP falla
      throw new Error("Fallo en una o más peticiones al servidor central.");
    }

    // Convierte en formato JSON el cuerpo de la respuesta de usuarios de manera asíncrona
    const users = await resUsers.json();
    // Convierte en formato JSON el cuerpo de la respuesta de posts de manera asíncrona
    const posts = await resPosts.json();
    // Convierte en formato JSON el cuerpo de la respuesta de comentarios de manera asíncrona
    const comments = await resComments.json();
    // Convierte en formato JSON el cuerpo de la respuesta de álbumes de manera asíncrona
    const albums = await resAlbums.json();
    // Convierte en formato JSON el cuerpo de la respuesta de fotos de manera asíncrona
    const photos = await resPhotos.json();

    // Recorre de forma inmutable el arreglo de usuarios generando una nueva estructura
    const usuariosEnriquecidos = users.map((usuario) => {
      // Filtra las publicaciones cuyo userId coincida con el ID del usuario actual
      const userPosts = posts.filter((p) => p.userId === usuario.id);

      // Mapea cada publicación del usuario para incorporarle sus comentarios correspondientes
      const postsConComentarios = userPosts.map((post) => ({
        ...post, // Copia las propiedades originales del post usando el operador spread
        comentarios: comments.filter((c) => c.postId === post.id) // Filtra los comentarios por postId
      }));

      // Filtra los álbumes cuya propiedad userId coincida con el ID del usuario actual
      const userAlbums = albums.filter((a) => a.userId === usuario.id);

      // Mapea cada álbum del usuario para incorporarle sus fotografías correspondientes
      const albumesConFotos = userAlbums.map((album) => ({
        ...album, // Copia las propiedades originales del álbum usando el operador spread
        fotografias: photos.filter((ph) => ph.albumId === album.id) // Filtra las fotos por albumId
      }));

      // Retorna el objeto unificado con las propiedades originales del usuario y sus arreglos anidados
      return {
        ...usuario, // Copia los datos generales del usuario usando spread
        posts: postsConComentarios, // Asigna las publicaciones con sus comentarios anidados
        albumes: albumesConFotos   // Asigna los álbumes con sus fotografías anidadas
      };
    });

    // Muestra en consola la confirmación de la transformación exitosa
    console.log("\n=================================================");
    console.log("  PROCESO COMPLETO: ESTRUCTURA DE DATOS ENRIQUECIDA");
    console.log("=================================================");
    // Imprime la cantidad total de registros de usuarios procesados
    console.log(`Total usuarios procesados: ${usuariosEnriquecidos.length}`);
    // Muestra un ejemplo parcial formateado del primer usuario resultante en la consola
    console.log("\nMuestra de estructura del primer usuario procesado:");
    console.log(JSON.stringify(usuariosEnriquecidos[0], null, 2).slice(0, 800) + "\n... [Estructura truncada para vista preliminar]");

  } catch (error) {
    // Muestra en consola el mensaje de error capturado si alguna operación falla
    console.error("\n[Error en Punto 5]:", error.message);
  }
}