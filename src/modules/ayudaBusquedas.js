/**
 * Módulo de Ayuda: Despliega la lista de criterios y palabras clave disponibles
 * para realizar búsquedas válidas en la API pública JSONPlaceholder.
 */
export function mostrarCriteriosBusqueda() {
  console.log("\n=================================================");
  console.log("   GUÍA DE CRITERIOS Y TÉRMINOS DE BÚSQUEDA      ");
  console.log("=================================================");
  
  console.log("\n[PUNTO 2] Usernames válidos para buscar usuarios:");
  console.log("  - Bret             (ID: 1  | Leanne Graham)");
  console.log("  - Antonette        (ID: 2  | Ervin Howell)");
  console.log("  - Samantha         (ID: 3  | Clementine Bauch)");
  console.log("  - Karianne         (ID: 4  | Patricia Lebsack)");
  console.log("  - Kamren           (ID: 5  | Chelsey Dietrich)");
  console.log("  - Leopoldo_Corkery (ID: 6  | Mrs. Dennis Schulist)");
  console.log("  - Elwyn.Skiles     (ID: 7  | Kurtis Weissnat)");
  console.log("  - Maxime_Nienow    (ID: 8  | Nicholas Runolfsdottir V)");
  console.log("  - Delphine         (ID: 9  | Glenna Reichert)");
  console.log("  - Moriah.Stanton   (ID: 10 | Clementina DuBuque)");

  console.log("\n[PUNTO 3] Términos clave para filtrar publicaciones (Posts):");
  console.log("  - sunt      (Encuentra publicaciones como 'sunt aut facere...')");
  console.log("  - optio     (Encuentra publicaciones como 'optio molestias...')");
  console.log("  - qui       (Encuentra publicaciones como 'qui est esse...')");
  console.log("  - dolor     (Encuentra publicaciones como 'dolorem dolore...')");
  console.log("  - asperiores(Encuentra publicaciones como 'asperiores ea...')");

  console.log("\n[RECURSOS TOTALES DISPONIBLES EN LA API]:");
  console.log("  - Usuarios     : 10 registros");
  console.log("  - Publicaciones: 100 publicaciones");
  console.log("  - Comentarios  : 500 comentarios");
  console.log("  - Álbumes      : 100 álbumes");
  console.log("  - Fotografías  : 5000 fotos");
  console.log("  - Tareas (Todos): 200 ítems");
  console.log("-------------------------------------------------\n");
}