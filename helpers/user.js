

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    // Añadir el eventListener al formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario (recargar la página)

        // Obtener los valores del formulario
        const correo = document.getElementById('email').value;
        const contrasena = document.getElementById('password').value;

        // Verificar si los campos están vacíos
        if (correo === '' || contrasena === '') {
            Swal.fire({
                title: '¡Mensaje !',
                text: 'Debe diligenciar los campos',
                icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                confirmButtonText: 'Aceptar'
            });
            return;  // Detener la ejecución si los campos están vacíos
        }

        try {
            // Enviar una solicitud GET con parámetros en la URL
            const response = await fetch('http://localhost:3010/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Asegurarse de enviar como JSON
                },
                body: JSON.stringify({ correo, contrasena })  // Enviar los datos como JSON en el cuerpo de la solicitud
            });

            const data = await response.json();  // Esperar la respuesta en formato JSON
            console.log('Datos recibidos:', data);  // Mostrar los datos del usuario
            
            if( data.status == 'ok' ){
                Swal.fire({
                    title: '¡Mensaje !',
                    text: 'Usuario encontrado.',
                    icon: 'success', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'Aceptar'
                });

                // GUARDAR EN LOCALSTORAGE
            }

            if( data.message == "Usuario no encontrado o contraseña incorrecta" ){
                Swal.fire({
                    title: '¡Mensaje !',
                    text: 'Usuario no encontrado',
                    icon: 'error', // Puede ser 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'Aceptar'
                });
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Ocurrió un error, intenta nuevamente');
        }
    });
});
