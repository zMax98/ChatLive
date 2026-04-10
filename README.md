# ChatWebsockets

Proyecto simple de chat en vivo usando Node.js, Express y Socket.IO.

## Descripción

Este proyecto muestra un chat en tiempo real con una interfaz moderna y notificaciones de SweetAlert2. El usuario ingresa su nombre vía modal y puede enviar mensajes que se distribuyen a todos los clientes conectados.

## Estructura del proyecto

- `src/app.js` - servidor Express + Socket.IO.
- `public/index.html` - interfaz del chat.
- `public/css/style.css` - estilos del chat y tema personalizado.
- `public/js/main.js` - lógica del cliente, manejo de SweetAlert2 y envío/recepción de mensajes.
- `.gitignore` - archivos y carpetas a ignorar.

## Instalación

1. Clonar el repositorio.
2. Abrir la carpeta del proyecto en la terminal.
3. Ejecutar:

```bash
npm install
```

## Uso

1. Iniciar el servidor:

```bash
node src/app.js
```

2. Abrir el navegador en:

```text
http://localhost:8080
```

3. Ingresar el nombre de usuario cuando aparezca el modal de SweetAlert2.
4. Escribir un mensaje y presionar Enter o el botón "Enviar".

## Funcionalidades

- Chat en tiempo real usando Socket.IO.
- Ventana modal para pedir nombre de usuario.
- Validación para evitar enviar mensajes sin nombre.
- Estilos oscuros y modernos con un diseño coherente.
- Notificaciones visuales que combinan con el tema.

## Notas

- `public/js/main.js` usa SweetAlert2 para pedir el nombre de usuario y notificar cuando se une al chat.
- Si quieres ejecutar en modo desarrollador, puedes instalar `nodemon` y correr:

```bash
npm install -D nodemon
npx nodemon src/app.js
```

## Licencia

Sin licencia específica. Usa el código como referencia para aprendizaje.
