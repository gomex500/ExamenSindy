"use strict";

fetch('data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  var revistaTitulo = document.getElementById('revista-titulo');
  var articulosContainer = document.getElementById('articulos-container');
  revistaTitulo.textContent = data.titulo;
  data.articulos.forEach(function (articulo) {
    var articuloCard = document.createElement('div');
    articuloCard.classList.add('articulo-card');
    articuloCard.innerHTML = "\n <h3>".concat(articulo.titulo, "</h3>\n <img src=\"").concat(articulo.imagen, "\" alt=\"\">\n <p>").concat(limitarDescripcion(articulo.contenido, 10), "</p>\n ");
    articuloCard.addEventListener('click', function () {
      mostrarModal(articulo);
    });
    articulosContainer.appendChild(articuloCard);
  });
  var imagenes = document.querySelectorAll('.articulo-card img');
  imagenes.forEach(function (imagen) {
    imagen.style.display = 'none'; // Oculta todas las imágenes al cargar la página
  });
})["catch"](function (error) {
  console.log('Error al cargar el archivo JSON:', error);
});

function limitarDescripcion(texto, longitud) {
  var palabras = texto.split(' ');

  if (palabras.length > longitud) {
    return palabras.slice(0, longitud).join(' ') + '...' + '<br><br>Seguir leyendo...';
  }

  return texto;
}

function mostrarModal(articulo) {
  var modal = document.getElementById('modal');
  var modalTitulo = document.getElementById('modal-titulo');
  var modalImagen = document.getElementById('modal-imagen');
  var modalContenido = document.getElementById('modal-contenido');
  modalTitulo.textContent = articulo.titulo;
  modalContenido.textContent = articulo.contenido;
  modalContenido.classList.add('modal-abierto');
  modal.style.display = 'block';
  modalImagen.style.display = 'none'; // Oculta la imagen inicialmente

  modalImagen.onload = function () {
    modalImagen.style.display = 'block'; // Muestra la imagen cuando se carga
  };

  modalImagen.src = articulo.imagen;
  var closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.addEventListener('click', function () {
    modalContenido.classList.add('modal-cerrado');
    setTimeout(function () {
      modalContenido.classList.remove('modal-cerrado');
      modal.style.display = 'none';
    }, 300);
  });
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modalContenido.classList.remove('modal-abierto');
      modal.style.display = 'none';
    }
  });
}