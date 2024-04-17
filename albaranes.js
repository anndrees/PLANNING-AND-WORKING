// Obtener la fecha de hoy para albaranes
const hoyAlbaran = new Date();
const añoAlbaran = hoyAlbaran.getFullYear();
const mesAlbaran = String(hoyAlbaran.getMonth() + 1).padStart(2, '0');
const diaAlbaran = String(hoyAlbaran.getDate()).padStart(2, '0');
const fechaHoyAlbaran = `${añoAlbaran}-${mesAlbaran}-${diaAlbaran}`;
document.getElementById('fechaAlbaran').value = fechaHoyAlbaran;

// Función para añadir conceptos de albarán
document.getElementById("anadirConceptoAlbaran").addEventListener("click", function() {
    // Código para añadir conceptos de albarán
    const conceptoAlbaran = document.createElement("div");
    conceptoAlbaran.classList.add("conceptoAlbaran");
    conceptoAlbaran.innerHTML = `
        <textarea name="conceptoAlbaran" required></textarea>
        <input type="text" name="importeAlbaran" placeholder="Importe (€)" required>
        <button type="button" class="eliminar-concepto">Eliminar concepto</button>
    `;
    document.getElementById("conceptosAlbaran").appendChild(conceptoAlbaran);

    // Aplicar la funcionalidad de formateo al nuevo campo de importe
    const nuevoImporteInput = conceptoAlbaran.querySelector('input[name="importeAlbaran"]');
    nuevoImporteInput.addEventListener('blur', function(event) {
        formatearImporte(nuevoImporteInput);
    });
});

// Aplicar la funcionalidad de formateo a los campos de importe existentes al cargar la página
document.querySelectorAll('input[name="importeAlbaran"]').forEach(importeInput => {
    importeInput.addEventListener('blur', function(event) {
        formatearImporte(importeInput);
    });
});

// Funcionalidad para eliminar conceptos
document.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("eliminar-concepto")) {
        event.target.parentNode.remove();
    }
});

// Función para cargar los clientes desde el almacenamiento local
function cargarClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const selectCliente = document.getElementById('selectCliente');
    selectCliente.innerHTML = ''; // Limpiar el desplegable antes de agregar los nuevos clientes

    // Agregar la opción por defecto al desplegable
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = '-- Seleccione un cliente --';
    selectCliente.appendChild(optionDefault);

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nif;
        option.textContent = cliente.nombre;
        selectCliente.appendChild(option);
    });
}

// Función para añadir un nuevo cliente
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

// Llamar a la función cargarClientes al cargar la página
document.addEventListener('DOMContentLoaded', cargarClientes);

// Añadir un listener de evento al botón para añadir cliente
document.getElementById('añadirCliente').addEventListener('click', añadirCliente);


// Función para mostrar la lista de clientes en un desplegable
function mostrarListaClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    if (clientes && clientes.length > 0) {
        const selectCliente = document.createElement('select');
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.nombre;
            option.textContent = cliente.nombre + ' (' + cliente.nif + ')';
            selectCliente.appendChild(option);
        });
        
        const confirmacion = confirm('¿Estás seguro que quieres eliminar este cliente?', selectCliente);
        if (confirmacion) {
            const clienteSeleccionado = selectCliente.value;
            if (clienteSeleccionado) {
                // Eliminar el cliente seleccionado
                const nuevosClientes = clientes.filter(cliente => cliente.nombre !== clienteSeleccionado);
                // Actualizar localStorage
                localStorage.setItem('clientes', JSON.stringify(nuevosClientes));
                // Mostrar mensaje de éxito
                alert('Cliente eliminado correctamente.');
            } else {
                alert('Por favor, seleccione un cliente válido.');
            }
        }
    } else {
        alert('No hay clientes almacenados.');
    }
}
