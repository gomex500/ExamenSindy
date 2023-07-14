fetch('../db/data.json')
    .then(response => response.json())
    .then(data => {
        const revistaTitulo = document.getElementById('revista-titulo');
        const articulosContainer = document.getElementById('articulos-container');
        revistaTitulo.textContent = data.titulo;
        data.articulos.forEach(articulo => {
            const articuloCard = document.createElement('div');
            articuloCard.classList.add('articulo-card');
            articuloCard.innerHTML = `
 <h3>${articulo.titulo}</h3>
 <img src="${articulo.imagen}" alt="">
 <p>${limitarDescripcion(articulo.contenido, 10)}</p>
 `;
            articuloCard.addEventListener('click', () => {
                mostrarModal(articulo);
            });
            articulosContainer.appendChild(articuloCard);
        });
        const imagenes = document.querySelectorAll('.articulo-card img');
        imagenes.forEach(function (imagen) {
            imagen.style.display = 'none'; // Oculta todas las imágenes al cargar la página
        });
    })
    .catch(error => {
        console.log('Error al cargar el archivo JSON:', error);
    });

function limitarDescripcion(texto, longitud) {
    const palabras = texto.split(' ');
    if (palabras.length > longitud) {
        return palabras.slice(0, longitud).join(' ') + '...' + '<br><br>Seguir leyendo...';
    }
    return texto;
}

function mostrarModal(articulo) {
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalImagen = document.getElementById('modal-imagen');
    const modalContenido = document.getElementById('modal-contenido');
    modalTitulo.textContent = articulo.titulo;
    modalContenido.textContent = articulo.contenido;
    modalContenido.classList.add('modal-abierto');
    modal.style.display = 'block';
    modalImagen.style.display = 'none'; // Oculta la imagen inicialmente
    modalImagen.onload = function () {
        modalImagen.style.display = 'block'; // Muestra la imagen cuando se carga
    };
    modalImagen.src = articulo.imagen;
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        modalContenido.classList.add('modal-cerrado');
        setTimeout(() => {
            modalContenido.classList.remove('modal-cerrado');
            modal.style.display = 'none';
        }, 300);
    });
    window.addEventListener('click', event => {
        if (event.target === modal) {
            modalContenido.classList.remove('modal-abierto');
            modal.style.display = 'none';
        }
    });
}