let user; // Variable global para almacenar el nombre de usuario
const socket = io(); // Conexión al servidor WebSocket

const messageContainer = document.getElementById('message-container');
const chatInput = document.getElementById('chat-input');
// const usernameInput = document.getElementById('username'); // Esta entrada está en el HTML, pero el nombre se pide por SweetAlert2
const sendBtn = document.getElementById('send-btn');

const promptUsername = () => {
    return Swal.fire({
        title: 'Identifícate',
        input: 'text',
        text: 'Ingresa tu nombre de usuario para unirte al chat',
        inputValidator: (value) => {
            return !value && '¡Necesitas escribir un nombre de usuario para continuar!';
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
        background: '#111827',
        color: '#f8fafc',
        customClass: {
            popup: 'swal2-dark-popup',
            title: 'swal2-dark-title',
            content: 'swal2-dark-content',
            confirmButton: 'swal2-dark-button',
            cancelButton: 'swal2-dark-button',
            input: 'swal2-dark-input',
            icon: 'swal2-dark-icon'
        },
    }).then((result) => {
        user = result.value?.trim();
        if (!user) {
            return promptUsername();
        }
        socket.emit('new_user', user);
        Swal.fire({
            text: `${user} se ha unido al chat`,
            toast: true,
            position: 'top-right',
            timer: 3000,
            showConfirmButton: false,
            icon: 'info',
            background: '#0f172a',
            color: '#f8fafc',
            customClass: {
                popup: 'swal2-dark-popup',
                title: 'swal2-dark-title',
                content: 'swal2-dark-content',
                confirmButton: 'swal2-dark-button',
                icon: 'swal2-dark-icon'
            },
        });
        return user;
    });
};

const sendMessage = () => {
    const message = chatInput.value.trim();

    if (!user) {
        Swal.fire({
            title: 'Falta tu nombre',
            text: 'Debes ingresar un nombre de usuario antes de enviar mensajes.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            background: '#0f172a',
            color: '#f8fafc',
            customClass: {
                popup: 'swal2-dark-popup',
                title: 'swal2-dark-title',
                content: 'swal2-dark-content',
                confirmButton: 'swal2-dark-button',
                icon: 'swal2-dark-icon'
            },
        });
        promptUsername();
        return;
    }

    if (message !== '') {
        socket.emit('message', { username: user, message });
        chatInput.value = ''; // Limpiar el campo de entrada
    }
};

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

socket.on('connect', () => {
    if (!user) {
        promptUsername();
    }
});

// Código antiguo que usaba el input de nombre directamente, se deja comentado porque no debe ejecutarse con SweetAlert2
// sendBtn.addEventListener('click', () => {
//     const user = usernameInput.value || 'Anónimo';
//     const message = chatInput.value.trim();
//
//     if (message !== "") {
//         socket.emit('message', { username: user, message });
//         chatInput.value = ''; 
//     }
// });

socket.on('everyone_message', (data) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messageContainer.appendChild(messageElement);
});