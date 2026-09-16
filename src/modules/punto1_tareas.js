const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Punto 1: Listar todas las tareas pendientes por cada usuario.
 */
export async function listarTareasPendientes() {
  try {
    console.log("\n[Punto 1] Consultando tareas pendientes por usuario...");
    const [resUsers, resTodos] = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/todos`)
    ]);

    if (!resUsers.ok || !resTodos.ok) throw new Error("Error al obtener los datos de la API");

    const usuarios = await resUsers.json();
    const todos = await resTodos.json();

    const reporte = usuarios.map((u) => ({
      usuario: u.name,
      username: u.username,
      pendientes: todos.filter((t) => t.userId === u.id && !t.completed).map((t) => t.title)
    }));

    console.log("\n=================================================");
    console.log("  TAREAS PENDIENTES POR USUARIO");
    console.log("=================================================");
    reporte.forEach((item) => {
      console.log(`\nUsuario: ${item.usuario} (@${item.username})`);
      console.log(`Total pendientes: ${item.pendientes.length}`);
      item.pendientes.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
    });
  } catch (error) {
    console.error("\n[Error en Punto 1]:", error.message);
  }
}