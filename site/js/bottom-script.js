// Obtener elementos del DOM
const botonAumentar = document.getElementById('suma');
const botonDisminuir = document.getElementById('resta');
const cantidadElemento = document.getElementById('cant');

let cantidad = 1;

function actualizarCantidad() {
    cantidadElemento.value = cantidad;
}

botonAumentar.addEventListener('click', () => {
    cantidad++;
    actualizarCantidad();
});

botonDisminuir.addEventListener('click', () => {
    if (cantidad > 1) {
        cantidad--;
    }
    actualizarCantidad();
});