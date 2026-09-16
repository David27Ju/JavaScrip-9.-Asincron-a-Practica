import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Punto 2: Buscar usuario por username con sus álbumes y fotos anidadas.
 */
export async function buscarUsuarioConAlbumesYFotos() {
  const rl = readline.createInterface({ input, output });
  try {
    const usernameInput = await rl.question("\nIngrese el username del usuario a buscar (ej: Bret, Antonette): ");
    rl.close();

    const username = usernameInput.trim();
    if (!username) throw new Error("Debe ingresar un nombre de usuario válido.");

    const resUser = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}`);
    if (!resUser.ok) throw new Error("Error en la conexión con la API");
    
    const usuarios = await resUser.json();
    if (usuarios.length === 0) {
      console.log(`\nNo se encontró ningún usuario con el username "${username}".`);
      return;
    }

    const usuario = usuarios[0];
    const [resAlbums, resPhotos] = await Promise.all([
      fetch(`${API_URL}/albums?userId=${usuario.id}`),
      fetch(`${API_URL}/photos`)
    ]);

    const albums = await resAlbums.json();
    const photos = await resPhotos.json();

    const albumesConFotos = albums.map((alb) => ({
      ...alb,
      fotografias: photos.filter((p) => p.albumId === alb.id)
    }));

    console.log(`\n=================================================`);
    console.log(`DATOS DEL USUARIO: ${usuario.name} (@${usuario.username})`);
    console.log(`Email: ${usuario.email} | Teléfono: ${usuario.phone}`);
    console.log(`=================================================`);
    
    albumesConFotos.forEach((a) => {
      console.log(`\nÁlbum [ID ${a.id}]: "${a.title}"`);
      console.log(`Fotografías asociadas (${a.fotografias.length}):`);
      a.fotografias.slice(0, 3).forEach((f) => console.log(`  - [Foto ${f.id}] ${f.title}`));
      if (a.fotografias.length > 3) {
        console.log(`  ... y ${a.fotografias.length - 3} fotografías más.`);
      }
    });
  } catch (error) {
    rl.close();
    console.error("\n[Error en Punto 2]:", error.message);
  }
}