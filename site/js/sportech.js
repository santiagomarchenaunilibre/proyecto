const products = [{

  id: 2400,
  image: 'img/gorra.jpg',
  name:'Gorra blanca' ,
  descripcion: 'Gorra deportiva de alta calidad.',
  precioCent: 15000000,
}, {
  id: 2401,
  image: 'img/tula.jpg',
  name: 'Morral Sportech',
  descripcion: 'Morral resistente para todo tipo de aventura',
  precioCent: 17000000,
}, {
  id: 2402,
  image:'img/botas.jpg',
  name: 'Botas senderismo Sportech',
  descripcion: 'Botas de senderismo con excelente soporte',
  precioCent: 19000000,


},{
  id: 2403,
  image:'img/sudadera.jpg',
  name: 'Jogger deportivo Sportech',
  descripcion: 'Botas de senderismo con excelente soporte',
  precioCent: 27000000,

}, {
  id: 2404,
  image:'img/shorts-simple.jpg',
  name: 'Shorts básicos Grey',
  descripcion: 'Shorts básicos de color gris sin estampado en tela de 100% de algodón',
  precioCent: 9000000,


},{
  id: 2405,
  image:'img/zapatos-cloud.jpg',
  name: 'Zapatos deportivos CloudSport',
  descripcion: 'Zapatos ergonomicos que cuidan tus pies',
  precioCent: 18000000,

}]


let carouselHTML = "";
let slideHTML = "";

products.forEach((product, index) => {
  
  
  slideHTML += `
    <div class="col-12 col-md-3 mb-3">
      <div class="card p3">
        <a href="#"><img src="${product.image}" class="card-img-top" alt="${product.name}"></a>
        <div class="card-body">
          <h4 class="card-title">${product.name}</h4>
          <p class="card-text fs-5 text">$${(product.precioCent / 100).toLocaleString("es-CO")}</p>
        </div>
      </div>
    </div>
  `;


  if ((index + 1) % 4 === 0 || index === products.length - 1) {
    carouselHTML += `
      <div class="carousel-item ${index < 4 ? "active" : ""}">
        <div class="row">${slideHTML}</div>
      </div>
    `;
    slideHTML = ""; 
  }
});

const carouselContainer = document.querySelector("#carouselOfertas .carousel-inner");
if (carouselContainer) {
  carouselContainer.innerHTML = carouselHTML;
} else {
  console.error("No se encontró el contenedor del carrusel en el DOM.");
}
