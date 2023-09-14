if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }
// Obtenemos referencias a los elementos HTML que necesitamos manipular.
const inputText = document.getElementById('inputText');
const aceptarButton = document.getElementById('aceptarButton');
const listaElementos = document.getElementById('listaElementos');


// Cargamos los datos almacenados en el localStorage cuando la página se carga.
document.addEventListener('DOMContentLoaded', cargarListaDesdeLocalStorage);


// Asociamos un evento de clic al botón "Agregar".
aceptarButton.addEventListener('click', agregarElemento);


// Función para agregar un elemento a la lista.
function agregarElemento() {
    // Obtenemos el texto del input y lo limpiamos de espacios en blanco.
    const texto = inputText.value.trim();
    if (texto !== '') {
        // Creamos un nuevo elemento de lista.
        const li = document.createElement('li');
        li.textContent = texto;


        // Creamos un botón con una "X" para eliminar el elemento.
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'X';
        botonEliminar.classList.add('eliminar');

        // Relacionamos un evento de clic al botón "X" para eliminar el elemento.
        botonEliminar.addEventListener('click', () => {
            li.remove();
            guardarListaEnLocalStorage();
        });

        // Añadimos el botón "X" al elemento de la lista.
        li.appendChild(botonEliminar);

        // Añadimos el elemento de lista a la lista existente.
        listaElementos.appendChild(li);

        // Limpiamos el cuadro de texto.
        inputText.value = '';

        // Guardamos la lista en el localStorage.
        guardarListaEnLocalStorage();
    }
}

// Función para almacenar la lista en el localStorage.
function guardarListaEnLocalStorage() {
    const elementos = [];
    listaElementos.querySelectorAll('li').forEach((elemento) => {
        // Creamos una copia del elemento <li> para eliminar los botones antes de agregarlo al array.
        const elementoSinBoton = elemento.cloneNode(true);
        elementoSinBoton.querySelectorAll('button').forEach((button) => {
            // Eliminamos los botones dentro del elemento <li> clonado.
            button.remove();
        });
        elementos.push(elementoSinBoton.textContent);
    });
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

// Función para cargar la lista desde el localStorage.
function cargarListaDesdeLocalStorage() {
    const elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    elementosGuardados.forEach((elementoTexto) => {
        const li = document.createElement('li');


        // Creamos un botón "X" para eliminar el elemento.
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'X';
        botonEliminar.classList.add('eliminar');

        li.textContent = elementoTexto;

        // Asociamos un evento de clic al botón "X" para eliminar el elemento.
        botonEliminar.addEventListener('click', () => {
            li.remove();
            guardarListaEnLocalStorage();
        });


        // Agregamos el botón "X" al elemento de lista.
        li.appendChild(botonEliminar);

        listaElementos.appendChild(li);
    });
}
