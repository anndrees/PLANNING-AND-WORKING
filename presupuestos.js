// Obtener la fecha de hoy para presupuestos
const hoyPresupuesto = new Date();
const añoPresupuesto = hoyPresupuesto.getFullYear();
const mesPresupuesto = String(hoyPresupuesto.getMonth() + 1).padStart(2, '0');
const diaPresupuesto = String(hoyPresupuesto.getDate()).padStart(2, '0');
const fechaHoyPresupuesto = `${añoPresupuesto}-${mesPresupuesto}-${diaPresupuesto}`;
document.getElementById('fechaPresupuesto').value = fechaHoyPresupuesto;

// Función para añadir conceptos de presupuesto
document.getElementById("anadirConceptoPresupuesto").addEventListener("click", function() {
    // Código para añadir conceptos de presupuesto
    const conceptoPresupuesto = document.createElement("div");
    conceptoPresupuesto.classList.add("conceptoPresupuesto");
    conceptoPresupuesto.innerHTML = `
        <textarea name="conceptoPresupuesto" required></textarea>
        <input type="text" name="importePresupuesto" placeholder="Importe (€)" required>
        <button type="button" class="eliminar-concepto">Eliminar concepto</button>
    `;
    document.getElementById("conceptosPresupuesto").appendChild(conceptoPresupuesto);

    // Aplicar la funcionalidad de formateo al nuevo campo de importe
    const nuevoImporteInput = conceptoPresupuesto.querySelector('input[name="importePresupuesto"]');
    nuevoImporteInput.addEventListener('blur', function(event) {
        formatearImporte(nuevoImporteInput);
    });
});

// Aplicar la funcionalidad de formateo a los campos de importe existentes al cargar la página
document.querySelectorAll('input[name="importePresupuesto"]').forEach(importeInput => {
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

