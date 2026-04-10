const express = require('express');
const { Server } = require('socket.io'); //Importamos la clase Server de socket.io
const path = require('path');

const app = express();
const PORT = 8080;

//Middleware para servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

//Iniciamos el servidor HTTP
const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor de chat corriendo en http://localhost:${PORT}`);
});

//Creamos una instancia de Socket.IO y la vinculamos al servidor HTTP
const io = new Server(httpServer);

//Escuchamos cuando alguien se conecta (evento 'connection')
io.on('connection', (socket) => {
    console.log('¡Nuevo usuario conectado! ID:', socket.id);

    //Escuchamos el evento 'mensaje' que el cliente envía
    socket.on('message', (data) => {
        console.log(`Mensaje de ${data.username}: ${data.message}`);

        //Emitimos el mensaje a todos los clientes conectados (incluido el que lo envió)
        io.emit('everyone_message', data);
    });

    //Escuchamos cuando un usuario se identifica
    socket.on('new_user', (username) => {
        socket.user = username; // Guardamos el nombre de usuario en la instancia del socket

        //Notificamos a todos los demás usuarios que un nuevo usuario se ha unido al chat
        socket.broadcast.emit('userConnected', { username: 'Sistema', message: `${username} se ha unido al chat.` });
    });

    //Escuchamos cuando alguien se desconecta (evento 'disconnect')
    socket.on('disconnect', () => {
        console.log('Usuario desconectado. ID:', socket.id);
    });
}); 