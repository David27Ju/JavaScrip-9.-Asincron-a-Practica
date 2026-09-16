import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Punto 3: Filtrar posts por título e incorporar sus comentarios.
 */
export async function filtrarPostsConComentarios() {
  const rl = readline.createInterface({ input, output });
  try {
    const terminoInput = await rl.question("\nIngrese la palabra para filtrar posts por título (ej: sunt, optio): ");
    rl.close();

    const termino = terminoInput.trim().toLowerCase();
    if (!termino) throw new Error("Debe proporcionar un texto de búsqueda.");

    const [resPosts, resComments] = await Promise.all([
      fetch(`${API_URL}/posts`),
      fetch(`${API_URL}/comments`)
    ]);

    if (!resPosts.ok || !resComments.ok) throw new Error("Error al obtener posts o comentarios");

    const posts = await resPosts.json();
    const comments = await resComments.json();

    const postsFiltrados = posts
      .filter((p) => p.title.toLowerCase().includes(termino))
      .map((p) => ({
        ...p,
        comentarios: comments.filter((c) => c.postId === p.id)
      }));

    console.log(`\n=================================================`);
    console.log(`POSTS ENCONTRADOS QUE CONTIENEN "${termino}": ${postsFiltrados.length}`);
    console.log(`=================================================`);

    if (postsFiltrados.length === 0) {
      console.log("No se encontraron coincidencias.");
      return;
    }

    postsFiltrados.forEach((p) => {
      console.log(`\nPost [ID ${p.id}]: "${p.title}"`);
      console.log(`Comentarios (${p.comentarios.length}):`);
      p.comentarios.forEach((c) => {
        console.log(`  - [${c.email}]: ${c.body.replace(/\n/g, " ")}`);
      });
    });
  } catch (error) {
    rl.close();
    console.error("\n[Error en Punto 3]:", error.message);
  }
}