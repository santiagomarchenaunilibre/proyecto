document.addEventListener("DOMContentLoaded", () => {
    const carritoContainer = document.querySelector('#carritoList');
    const totalPrecio = document.querySelector('#totalPrecio');
    
  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<li class="list-group-item">No hay productos en el carrito</li>';
        totalPrecio.textContent = '$0.00';
    } else {
       
        let total = 0;
        carrito.forEach(producto => {
            const liProducto = document.createElement('li');
            liProducto.classList.add('list-group-item');
            liProducto.innerHTML = `
                <div class="d-flex justify-content-center>
                    <div class="d-flex justify-content-between">
                        <span class="p-2">${producto.nombre}</span>
                        <div class="p-2"> <img src="${producto.imagen}" id="cart-image"></div> </div>
                    <span>$${producto.precio}</span>
                </div>
            `;
            carritoContainer.appendChild(liProducto);
            
            total += parseFloat(producto.precio.replace(/[^\d.-]/g, ''));
        });

       
        totalPrecio.textContent = `$${total.toFixed(2)}`;
    }
});