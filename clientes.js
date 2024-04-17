// Obtener el modal de añadir cliente
const modalAñadirCliente = document.getElementById('modalAñadirCliente');

// Obtener el botón que abre el modal
const botonAñadirCliente = document.getElementById('añadirCliente');

// Obtener el botón de cerrar del modal
const botonCerrarAñadirCliente = document.querySelector('.cerrar-modalAñadirCliente');

// Obtener el formulario dentro del modal
const formularioAñadirCliente = document.getElementById('formularioAñadirCliente');

// Función para mostrar el modal de añadir cliente
function mostrarModalAñadirCliente() {
    modalAñadirCliente.style.display = 'block';
}

// Función para ocultar el modal de añadir cliente
function ocultarModalAñadirCliente() {
    modalAñadirCliente.style.display = 'none';
}

// Función para manejar el envío del formulario dentro del modal
function procesarFormularioAñadirCliente(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombreCliente').value;
    const nif = document.getElementById('nifCliente').value;
    const direccion = document.getElementById('direccionCliente').value;
    const cp = document.getElementById('cpCliente').value;

    // Validar que se ingresen datos válidos
    if (nombre.trim() === '' || nif.trim() === '' || direccion.trim() === '' || cp.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un objeto cliente
    const cliente = {
        nombre: nombre,
        nif: nif,
        direccion: direccion,
        cp: cp
    };

    // Obtener los clientes existentes del localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Agregar el nuevo cliente a la lista de clientes
    clientes.push(cliente);

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Cerrar el modal después de agregar el cliente
    ocultarModalAñadirCliente();

    // Recargar la lista de clientes en el desplegable
    cargarClientes();

    // Mostrar mensaje de éxito
    alert('Cliente añadido correctamente.');
}

// Agregar event listeners a los botones para mostrar y ocultar el modal
botonAñadirCliente.addEventListener('click', mostrarModalAñadirCliente);
//botonCerrarAñadirCliente.addEventListener('click', ocultarModalAñadirCliente);

// Agregar event listener al formulario dentro del modal
formularioAñadirCliente.addEventListener('submit', procesarFormularioAñadirCliente);



document.addEventListener('DOMContentLoaded', function() {
    cargarClientes();
});

function cargarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = ''; // Limpiar la lista antes de cargar los clientes
    
    // Obtener clientes desde localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Mostrar cada cliente en la lista
    clientes.forEach(function(cliente, index) {
        const clienteDiv = document.createElement('div');

        // Texto del cliente
        const clienteText = document.createElement('span');
        clienteText.textContent = cliente.nombre + ' (' + cliente.nif + ') ';
        clienteDiv.appendChild(clienteText);

        // Botón "Editar cliente"
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', function() {
            editarCliente(index);
        });
        clienteDiv.appendChild(btnEditar);

        // Botón "Eliminar cliente"
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function() {
            confirmarEliminarCliente(index);
        });
        clienteDiv.appendChild(btnEliminar);

        // Agregar el contenedor del cliente a la lista
        listaClientes.appendChild(clienteDiv);
    });
}


/*
function editarCliente(clienteIndex) {
    const confirmacion = confirm('¿Estás seguro que quieres editar este cliente?');
    if (confirmacion) {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const cliente = clientes[clienteIndex];

        const nuevoNombre = prompt('Ingrese el nuevo nombre o razón social del cliente:', cliente.nombre);
        const nuevoNif = prompt('Ingrese el nuevo NIF del cliente:', cliente.nif);
        const nuevaDireccion = prompt('Ingrese la nueva dirección del cliente:', cliente.direccion);
        const nuevoCP = prompt('Ingrese el nuevo código postal del cliente:', cliente.cp);
        
        if (nuevoNombre && nuevoNif && nuevaDireccion && nuevoCP) {
            clientes[clienteIndex] = {
                nombre: nuevoNombre,
                nif: nuevoNif,
                direccion: nuevaDireccion,
                cp: nuevoCP
            };
            localStorage.setItem('clientes', JSON.stringify(clientes));
            cargarClientes();
            alert('Cliente editado correctamente.');
        } else {
            alert('Debe completar todos los campos para editar el cliente.');
        }
    }
}
*/


function confirmarEliminarCliente(index) {
    const confirmacion = confirm('¿Estás seguro que quieres eliminar este cliente?');
    if (confirmacion) {
        eliminarCliente(index);
    }
}

function eliminarCliente(clienteIndex) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.splice(clienteIndex, 1); // Eliminar el cliente en la posición clienteIndex
    localStorage.setItem('clientes', JSON.stringify(clientes));
    cargarClientes();
    alert('Cliente eliminado correctamente.');
}


// Función para añadir un nuevo cliente
/*
function añadirCliente() {
    const nombre = prompt('Ingrese el Nombre o Razón Social del cliente:');
    const nif = prompt('Ingrese el NIF del cliente:');
    const direccion = prompt('Ingrese la Dirección del cliente:');
    const cp = prompt('Ingrese el Código Postal del cliente:');
    
    if (nombre && nif && direccion && cp) {
        // Crear un objeto cliente
        const cliente = {
            nombre: nombre,
            nif: nif,
            direccion: direccion,
            cp: cp
        };

        // Obtener los clientes existentes del localStorage
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Agregar el nuevo cliente a la lista de clientes
        clientes.push(cliente);

        // Guardar los datos actualizados en el localStorage
        localStorage.setItem('clientes', JSON.stringify(clientes));

        // Recargar la lista de clientes en el desplegable
        cargarClientes();
        alert('Cliente añadido correctamente.');
    } else {
        alert('Debe completar todos los campos para añadir un nuevo cliente.');
    }
}
*/


document.getElementById('añadirCliente').addEventListener('click', añadirCliente);
