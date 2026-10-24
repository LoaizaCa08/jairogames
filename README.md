# JAIROGAMES

Portal web de juegos en HTML, CSS y JavaScript, sin dependencias de compilación ni base de datos. El progreso se guarda en el navegador mediante `localStorage`.

Sitio: https://jairogames.online

## Estructura del Proyecto

- `/` (`index.html`, `portal.css`, `portal.js`): Portada principal de **JAIROGAMES** con el selector de juegos.
- `/call-of-j/`: **1. Call of J** — Novela visual interactiva y minijuegos (creado y completo).
- `/jairo-rescuee/`: **2. Jairo Rescuee** — Juego arcade de plataformas y acción lateral con 10 niveles (Virocentro, El Cine, San Jorge y Virocasa).

## Desarrollo local

Abre `index.html` en un navegador, o sirve esta carpeta con cualquier servidor HTTP estático.

Comprobación de sintaxis con Node.js:

```sh
node --check portal.js
node --check call-of-j/data.js
node --check call-of-j/game.js
node --check jairo-rescuee/data.js
node --check jairo-rescuee/sprites.js
node --check jairo-rescuee/game.js
```

## Despliegue en el VPS

Los registros DNS A de `jairogames.online` y `www.jairogames.online` deben apuntar a `162.35.118.67`. El servidor necesita los puertos TCP 22, 80 y 443 accesibles.

Desde una copia del repositorio, en una terminal con Git y OpenSSH:

```sh
git archive --format=tar.gz -o jairogames-release.tar.gz HEAD
scp jairogames-release.tar.gz root@162.35.118.67:/tmp/
ssh root@162.35.118.67 'release=$(mktemp -d /tmp/jairogames.XXXXXX) && tar -xzf /tmp/jairogames-release.tar.gz -C "$release" && bash "$release/deploy/setup.sh"'
```

El script instala Nginx y Certbot en Ubuntu/Debian, publica los cuatro archivos del juego en `/var/www/jairogames/releases/` y cambia el enlace `/var/www/jairogames/current` de forma atómica. Configura ambos dominios, HTTPS de Let's Encrypt, redirección de HTTP a HTTPS y renovación automática mediante `certbot.timer`. Las actualizaciones conservan la configuración HTTPS existente. Las credenciales no se guardan en el repositorio.

El certificado inicial se registra sin correo de contacto; se puede añadir después con `certbot update_account --email tu-correo@example.com`.

Para revisar el servicio:

```sh
sudo nginx -t
sudo systemctl status nginx certbot.timer
sudo certbot renew --dry-run
```

Para volver a una versión anterior, selecciona una carpeta dentro de `/var/www/jairogames/releases/` y actualiza el enlace `current` a esa carpeta. No es necesario reiniciar Nginx para cambiar los archivos estáticos.
