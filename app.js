import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Única importación del proyecto desde el archivo barril
import {
  listarTareasPendientes,
  buscarUsuarioConAlbumesYFotos,
  filtrarPostsConComentarios,
  obtenerNombreYTelefonoUsuarios,
  consultarYEnriquecerUsuariosCompletos,
  mostrarCriteriosBusqueda
} from "./src/modules/index.js";

/**
 * Menú interactivo por consola terminal.
 */
async function iniciarMenu() {
  const rl = readline.createInterface({ input, output });

  console.log("\n==================================================");
  console.log("     EVALUACIÓN: 9. ASINCRONÍA PRÁCTICA (SENA)    ");
  console.log("==================================================");
  console.log("1. Listar tareas pendientes por cada usuario");
  console.log("2. Buscar usuario por username (con álbumes y fotos)");
  console.log("3. Filtrar posts por título (con comentarios)");
  console.log("4. Consultar usuarios (solo nombre y teléfono)");
  console.log("5. Petición masiva: Enriquecer usuarios completos");
  console.log("6. Ver guía de criterios y términos de búsqueda");
  console.log("0. Salir");
  console.log("--------------------------------------------------");

  const opcion = await rl.question("Seleccione una opción (0-6): ");
  rl.close();

  switch (opcion.trim()) {
    case "1":
      await listarTareasPendientes();
      return iniciarMenu();
    case "2":
      await buscarUsuarioConAlbumesYFotos();
      return iniciarMenu();
    case "3":
      await filtrarPostsConComentarios();
      return iniciarMenu();
    case "4":
      await obtenerNombreYTelefonoUsuarios();
      return iniciarMenu();
    case "5":
      await consultarYEnriquecerUsuariosCompletos();
      return iniciarMenu();
    case "6":
      mostrarCriteriosBusqueda();
      return iniciarMenu();
    case "0":
      console.log("\nEjecución finalizada. ¡Hasta luego!\n");
      break;
    default:
      console.log("\n[Opción inválida] Por favor ingrese un número entre 0 y 6.");
      return iniciarMenu();
  }
}

// Iniciar aplicación
iniciarMenu();