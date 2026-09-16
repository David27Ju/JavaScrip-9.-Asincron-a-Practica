const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Punto 4: Transformar usuarios obteniendo únicamente nombre y teléfono.
 */
export async function obtenerNombreYTelefonoUsuarios() {
  try {
    console.log("\n[Punto 4] Consultando usuarios para modificar respuesta...");
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Error al obtener la lista de usuarios");

    const usuarios = await response.json();

    const usuariosSimplificados = usuarios.map((u) => ({
      nombre: u.name,
      telefono: u.phone
    }));

    console.log("\n=================================================");
    console.log("  NUEVO ARREGLO CON NOMBRE Y TELÉFONO DE USUARIOS");
    console.log("=================================================");
    console.log(usuariosSimplificados);
  } catch (error) {
    console.error("\n[Error en Punto 4]:", error.message);
  }
}