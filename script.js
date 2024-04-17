// Obtener la fecha de hoy
const hoy = new Date();

// Obtener el año, mes y día en formato de dos dígitos
const año = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // El mes es de 0 a 11, por eso se suma 1
const dia = String(hoy.getDate()).padStart(2, '0');

// Crear la cadena de fecha en el formato yyyy-mm-dd
const fechaHoy = `${año}-${mes}-${dia}`;

// Establecer el valor predeterminado del campo de fecha
document.getElementById('fecha').value = fechaHoy;



// Función para formatear el importe
function formatearImporte(importeInput) {
    const valor = importeInput.value.replace(',', '.'); // Reemplazamos la coma por el punto si la hubiera
    const valorFormateado = parseFloat(valor).toFixed(2).replace('.', ',') + ' €';
    importeInput.value = valorFormateado;
}

// Para facturas
document.getElementById("anadirConceptoFactura").addEventListener("click", function() {
    const conceptoFactura = document.createElement("div");
    conceptoFactura.classList.add("conceptoFactura");
    conceptoFactura.innerHTML = `
        <textarea name="conceptoFactura" required></textarea>
        <input type="text" name="importeFactura" placeholder="Importe (€)" required>
        <button type="button" class="eliminar-concepto">Eliminar concepto</button>
    `;
    document.getElementById("conceptos").appendChild(conceptoFactura);

    // Aplicar la funcionalidad de formateo al nuevo campo de importe
    const nuevoImporteInput = conceptoFactura.querySelector('input[name="importeFactura"]');
    nuevoImporteInput.addEventListener('blur', function(event) {
        formatearImporte(nuevoImporteInput);
    });
});

// Para presupuestos
document.getElementById("anadirConceptoPresupuesto").addEventListener("click", function() {
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

// Para albaranes
document.getElementById("anadirConceptoAlbaran").addEventListener("click", function() {
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
document.querySelectorAll('input[name="importeFactura"]').forEach(importeInput => {
    importeInput.addEventListener('blur', function(event) {
        formatearImporte(importeInput);
    });
});

document.querySelectorAll('input[name="importePresupuesto"]').forEach(importeInput => {
    importeInput.addEventListener('blur', function(event) {
        formatearImporte(importeInput);
    });
});

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


// Función para cargar los clientes desde el archivo JSON
function cargarClientes() {
    fetch('clientes.json')
        .then(response => response.json())
        .then(data => {
            const clientes = data.clientes;
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
        })
        .catch(error => console.error('Error al cargar los clientes:', error));
}


// Función para eliminar la opción por defecto cuando se seleccione un cliente
function eliminarPlaceholder() {
    const selectCliente = document.getElementById('selectCliente');
    if (selectCliente.value === '') {
        selectCliente.removeChild(selectCliente.options[0]);
    }
}


// Llamar a la función eliminarPlaceholder cuando se seleccione una opción diferente
document.getElementById('selectCliente').addEventListener('change', eliminarPlaceholder);


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

        // Obtener los clientes existentes del archivo JSON
        fetch('clientes.json')
            .then(response => response.json())
            .then(data => {
                // Agregar el nuevo cliente a la lista de clientes
                data.clientes.push(cliente);

                // Guardar los datos actualizados en el archivo JSON
                return fetch('clientes.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            })
            .then(() => {
                // Recargar la lista de clientes en el desplegable
                cargarClientes();
                alert('Cliente añadido correctamente.');
            })
            .catch(error => console.error('Error al añadir el cliente:', error));
    } else {
        alert('Debe completar todos los campos para añadir un nuevo cliente.');
    }
}


// Llamar a la función cargarClientes al cargar la página
document.addEventListener('DOMContentLoaded', cargarClientes);


// Añadir un listener de evento al botón para añadir cliente
document.getElementById('añadirCliente').addEventListener('click', añadirCliente);


// Función para manejar el envío del formulario
function handleSubmit(event) {
    // Obtener el valor seleccionado en el desplegable
    const clienteSeleccionado = document.getElementById('selectCliente').value;
    
    // Verificar si el cliente seleccionado es válido
    if (clienteSeleccionado === '' || clienteSeleccionado === null) {
        alert('Por favor, seleccione un cliente válido.');
        event.preventDefault(); // Evitar que el formulario se envíe
    } else {
        // El cliente seleccionado es válido, puedes continuar con el envío del formulario
        // Aquí puedes agregar cualquier otra lógica necesaria antes de enviar el formulario
    }
}

// Agregar un listener de evento al formulario para manejar su envío
document.getElementById('formularioFactura').addEventListener('submit', handleSubmit);

// Agregar un listener de evento al formulario para manejar su envío
document.getElementById('formularioPresupuesto').addEventListener('submit', handleSubmit);

// Agregar un listener de evento al formulario para manejar su envío
document.getElementById('formularioAlbaran').addEventListener('submit', handleSubmit);


document.getElementById('crearFactura').addEventListener('click', function() {
    console.log('Clic en crear factura'); // Verificar si se ejecuta este mensaje en la consola
    window.location.href = 'facturas.html'; // Redirigir a la página de facturas
});

document.getElementById('crearPresupuesto').addEventListener('click', function() {
    console.log('Clic en crear presupuesto'); // Verificar si se ejecuta este mensaje en la consola
    window.location.href = 'presupuestos.html'; // Redirigir a la página de presupuestos
});

document.getElementById('crearAlbaran').addEventListener('click', function() {
    console.log('Clic en crear albarán'); // Verificar si se ejecuta este mensaje en la consola
    window.location.href = 'albaranes.html'; // Redirigir a la página de albaranes
});

