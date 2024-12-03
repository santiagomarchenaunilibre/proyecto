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

            // Limpiar el contenido del carrusel antes de agregar nuevos elementos
            carouselInner.innerHTML = '';

            // Crear los slides dinámicamente
            let productItemsHTML = '';
            for (let i = 0; i < productos.length; i += 4) {
                // Divide los productos en bloques de 4 por página
                const productosPorSlide = productos.slice(i, i + 4);
                let slideHTML = `<div class="carousel-item ${i === 0 ? 'active' : ''}">`;
                slideHTML += '<div class="row">';

                productosPorSlide.forEach((producto) => {
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
                                </div>
                            </div>
                        </div>
                    `;
                });

                slideHTML += '</div></div>';
                productItemsHTML += slideHTML;
            }

            // Insertar los productos en el carrusel
            carouselInner.innerHTML = productItemsHTML;
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
});