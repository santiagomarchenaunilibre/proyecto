document.addEventListener("DOMContentLoaded", () => {
    // Obtener datos desde el archivo JSON
    fetch('./js/data.json')  // Correct path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const productos = data.productos;
            const carouselInner = document.querySelector('#carouselProductos');

         
            carouselInner.innerHTML = '';

          
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const tiempoUltimaAgregacion = parseInt(localStorage.getItem('tiempoUltimaAgregacion')) || 0;
            const tiempoLimite = 5 * 60 * 1000;  

            if (Date.now() - tiempoUltimaAgregacion > tiempoLimite) {
                localStorage.removeItem('carrito');
                localStorage.removeItem('tiempoUltimaAgregacion');
            }

            // Crear los slides dinámicamente
            let productItemsHTML = '';
            for (let i = 0; i < productos.length; i += 4) {
                // Divide los productos en bloques de 4 por página
                const productosPorSlide = productos.slice(i, i + 4);
                let slideHTML = `<div class="carousel-item ${i === 0 ? 'active' : ''}">`;
                slideHTML += '<div class="row">';

                productosPorSlide.forEach((producto) => {

                   
                    const estaEnCarrito = carrito.some(p => p.id === producto.id);

                    slideHTML += `
                        <div class="col-12 col-md-3 mb-3">
                            <div class="card">
                                <a href="${producto.link}">
                                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                                </a>
                                <div class="card-body">
                                    <p>
                                        <a class="link-body-emphasis link-offset-2 link-underline link-underline-opacity-0" href="${producto.link}">
                                            <h4 class="card-title">${producto.nombre}</h4>
                                        </a>
                                    </p>
                                    <p class="card-text fs-5 text">$${producto.precio}</p>
                                    <button type="button" class="btn btn-primary comprar-btn px-4" data-id="${producto.id}" style="background-color: #032830; --bs-btn-border-color: #000;">
                                        ${estaEnCarrito ? 'Agregado' : 'Agregar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });

                slideHTML += '</div></div>';
                productItemsHTML += slideHTML;
            }
             
            carouselInner.innerHTML = productItemsHTML;

            
              const buttons = document.querySelectorAll('.comprar-btn');
              buttons.forEach(button => {
                  button.addEventListener('click', (e) => {
                      const productoId = e.target.getAttribute('data-id');
                      const producto = productos.find(p => p.id == productoId);
                      agregarAlCarrito(producto, e.target); // Pasamos el producto y el botón como argumento
                  });
              });
          })
          .catch(error => {
              console.error('Error al cargar el archivo JSON:', error);
          });
  });
  

function agregarAlCarrito(producto, buttonElement) {
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    const productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente) {
        alert('Este producto ya está en tu carrito');
        return;
    }

    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    cambiarBotonAgregar(buttonElement);
}


function cambiarBotonAgregar(buttonElement) {
    buttonElement.innerHTML = 'Agregado';
    buttonElement.classList.add('agregado');  
}