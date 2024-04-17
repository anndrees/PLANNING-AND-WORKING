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

document.addEventListener('DOMContentLoaded', function() {
    const formularioAñadirCliente = document.getElementById('formularioAñadirCliente');
    formularioAñadirCliente.addEventListener('submit', procesarFormularioAñadirCliente);
    const botonAñadirCliente = document.getElementById('añadirCliente');
    botonAñadirCliente.addEventListener('click', mostrarModalAñadirCliente);

    function procesarFormularioAñadirCliente(event) {
        event.preventDefault();
        // Aquí puedes agregar la lógica para procesar el formulario de añadir cliente
        console.log('Formulario de añadir cliente enviado');
    }

    function mostrarModalAñadirCliente() {
        const modalAñadirCliente = document.getElementById('modalAñadirCliente');
        modalAñadirCliente.style.display = 'block';
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al contenedor de los botones "Editar"
    document.addEventListener('click', function(event) {
        // Verificar si el clic fue en un botón "Editar"
        if (event.target.classList.contains('eliminar-factura')) {
            const numFactura = event.target.dataset.numero;
            confirmarEliminarFactura(numFactura);
        }
    });
});

function confirmarEliminarFactura(numFactura) {
    // Preguntar al usuario si está seguro de eliminar la factura
    const confirmacion = confirm('¿Estás seguro que quieres eliminar esta factura?');
    if (confirmacion) {
        eliminarFactura(numFactura);
    }
}

function eliminarFactura(numFactura) {
    // Obtener la lista de facturas del almacenamiento local
    let facturas = JSON.parse(localStorage.getItem('facturas')) || [];

    // Filtrar las facturas para eliminar la que tiene el número de factura especificado
    facturas = facturas.filter(factura => factura.numFactura !== numFactura);

    // Actualizar la lista de facturas en el almacenamiento local
    localStorage.setItem('facturas', JSON.stringify(facturas));

    // Actualizar la tabla de facturas
    actualizarTablaFacturas();
}




// Función para guardar los cambios en el formulario de edición de factura dentro del modal
function guardarCambiosFacturaEditada(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los datos del formulario de edición de factura
    const numFactura = document.getElementById('numFacturaEditar').value;
    const fecha = document.getElementById('fechaEditar').value;
    const clienteSeleccionado = obtenerClienteSeleccionado('clienteEditar');
    const conceptos = [];

    // Obtener los conceptos de la factura editados
    const conceptosEditados = document.querySelectorAll('#conceptosEditar .conceptoFactura');
    conceptosEditados.forEach(concepto => {
        const descripcion = concepto.querySelector('textarea').value;
        const importe = concepto.querySelector('input[name="importeFacturaEditar"]').value;
        conceptos.push({ descripcion, importe });
    });

    // Crear el objeto de factura editada
    const facturaEditada = {
        numFactura,
        fecha,
        cliente: clienteSeleccionado,
        conceptos
    };

    // Obtener la lista de facturas del almacenamiento local
    let facturas = JSON.parse(localStorage.getItem('facturas')) || [];

    // Buscar la factura correspondiente en la lista de facturas
    const facturaIndex = facturas.findIndex(factura => factura.numFactura === numFactura);

    // Reemplazar la factura existente con la factura editada
    facturas[facturaIndex] = facturaEditada;

    // Guardar la lista actualizada de facturas en el almacenamiento local
    localStorage.setItem('facturas', JSON.stringify(facturas));

    // Actualizar la tabla de facturas en la página
    actualizarTablaFacturas();

    // Cerrar el modal de edición de factura
    cerrarModalEditarFactura();
}

// Event listener para el botón "Guardar Cambios" en el formulario de edición de factura dentro del modal
document.addEventListener('DOMContentLoaded', function() {
    const btnGuardarCambios = document.getElementById('formularioEditarFactura').querySelector('button[type="submit"]');
    btnGuardarCambios.addEventListener('click', function(event) {
        guardarCambiosFacturaEditada(event);
    });
});



// Función para abrir el modal de edición de factura
function abrirModalEditarFactura(numFactura) {

    console.log("Abriendo modal para editar factura:", numFactura);

    // Obtener la factura correspondiente al número de factura
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const factura = facturas.find(factura => factura.numFactura === numFactura);

    // Llenar el formulario de edición con los datos de la factura
    document.getElementById('numFacturaEditar').value = factura.numFactura;
    document.getElementById('fechaEditar').value = factura.fecha;

    // Cargar las opciones de clientes en el select
    cargarOpcionesClientes('clienteEditar', factura.cliente ? factura.cliente.nif : '');

    // Cargar los conceptos de la factura en el formulario de edición
    cargarConceptosFacturaEditar(factura.conceptos);

    // Mostrar el modal de edición
    const modalEditarFactura = document.getElementById('modalEditarFactura');
    modalEditarFactura.style.display = 'block';
}


// Función para cargar las opciones de clientes en un select
function cargarOpcionesClientes(idSelect, nifSeleccionado) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const selectCliente = document.getElementById(idSelect);
    selectCliente.innerHTML = ''; // Limpiar el select antes de agregar las nuevas opciones

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nif;
        option.textContent = cliente.nombre + ' (' + cliente.nif + ')';
        if (cliente.nif === nifSeleccionado) {
            option.selected = true; // Seleccionar la opción correspondiente al cliente de la factura
        }
        selectCliente.appendChild(option);
    });
}

// Función para cargar los conceptos de la factura en el formulario de edición
// Función para cargar los conceptos de la factura en el formulario de edición
function cargarConceptosFacturaEditar(conceptos) {
    const conceptosEditarFieldset = document.getElementById('conceptosEditar');
    conceptosEditarFieldset.innerHTML = ''; // Limpiar el fieldset antes de agregar los nuevos conceptos

    conceptos.forEach(concepto => {
        const conceptoFactura = document.createElement('div');
        conceptoFactura.classList.add('conceptoFactura');
        conceptoFactura.innerHTML = `
        <textarea name="conceptoFacturaEditar" required>${concepto.descripcion}</textarea>
        <input type="text" name="importeFacturaEditar" placeholder="Importe (€)" value="${concepto.importe}" required>
        <button type="button" class="eliminar-concepto">Eliminar concepto</button>
        `;
        conceptosEditarFieldset.appendChild(conceptoFactura);

        // Aplicar la funcionalidad de formateo al campo de importe
        const importeInput = conceptoFactura.querySelector('input[name="importeFacturaEditar"]');
        importeInput.addEventListener('blur', function (event) {
            formatearImporte(importeInput);
        });
    });
}



// Función para cerrar el modal de edición de factura
function cerrarModalEditarFactura() {
    const modalEditarFactura = document.getElementById('modalEditarFactura');
    modalEditarFactura.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al botón "Añadir Concepto" en el formulario de edición de factura
    const btnAnadirConceptoEditarFactura = document.getElementById('anadirConceptoEditarFactura');
    btnAnadirConceptoEditarFactura.addEventListener('click', function() {
        // Lógica para añadir un nuevo concepto al formulario de edición de factura
        // Por ejemplo, puedes llamar a una función aquí que agregue un nuevo campo de concepto al formulario
        console.log('Se hizo clic en el botón "Añadir Concepto" en el formulario de edición de factura');
    });
});


function agregarNuevoConceptoEditarFactura() {
    // Obtener el fieldset donde se encuentran los conceptos del formulario de edición dentro del modal
    const fieldsetConceptos = document.getElementById('conceptosEditar');

    // Crear un nuevo div para el nuevo concepto
    const nuevoConcepto = document.createElement('div');
    nuevoConcepto.classList.add('conceptoFactura');

    // Crear el contenido HTML del nuevo concepto
    nuevoConcepto.innerHTML = `
        <textarea name="conceptoFacturaEditar" required></textarea>
        <input type="text" name="importeFacturaEditar" placeholder="Importe (€)" required>
        <button type="button" class="eliminar-concepto">Eliminar concepto</button>
    `;

    // Agregar el nuevo concepto al fieldset de conceptos
    fieldsetConceptos.appendChild(nuevoConcepto);

    // Agregar event listener al botón "Eliminar concepto" del nuevo concepto
    const btnEliminarConcepto = nuevoConcepto.querySelector('.eliminar-concepto');
    btnEliminarConcepto.addEventListener('click', function() {
        eliminarConceptoEditarFactura(nuevoConcepto);
    });
}

// Event listener para el botón "Añadir Concepto" en el formulario de edición de factura dentro del modal
document.addEventListener('DOMContentLoaded', function() {
    const btnAnadirConceptoEditarFactura = document.getElementById('anadirConceptoEditarFactura');
    btnAnadirConceptoEditarFactura.addEventListener('click', function() {
        agregarNuevoConceptoEditarFactura();
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al contenedor de los botones "Editar"
    document.addEventListener('click', function(event) {
        // Verificar si el clic fue en un botón "Editar"
        if (event.target.classList.contains('editar-factura')) {
            const numFactura = event.target.dataset.numero;
            abrirModalEditarFactura(numFactura);
        }
    });
});



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


document.addEventListener('DOMContentLoaded', function () {
    // Cargar clientes y actualizar número de factura al cargar la página
    cargarClientes();
    actualizarNumeroFactura();
});

// Llamar a la función para mostrar la tabla de facturas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarTablaFacturas);


// Llamar a la función para mostrar la tabla de facturas al cargar la página
document.addEventListener('DOMContentLoaded', actualizarTablaFacturas);



document.addEventListener('DOMContentLoaded', function () {
    cargarClientes();
    actualizarNumeroFactura();

    // Agregar evento de escucha para el envío del formulario
    document.getElementById('formularioFactura').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener los datos del formulario
        const numFactura = document.getElementById('numFactura').value;
        const clienteSeleccionado = obtenerClienteSeleccionado();
        const fecha = document.getElementById('fecha').value;
        const conceptos = [];

        // Obtener los conceptos de la factura
        document.querySelectorAll('#conceptos .conceptoFactura').forEach(concepto => {
            const descripcion = concepto.querySelector('textarea[name="conceptoFactura"]').value;
            const importe = concepto.querySelector('input[name="importeFactura"]').value;
            conceptos.push({ descripcion, importe });
        });

        // Crear objeto de factura
        const factura = {
            numFactura,
            cliente: clienteSeleccionado,
            fecha,
            conceptos
        };

        // Obtener la lista de facturas existente del localStorage
        const facturas = JSON.parse(localStorage.getItem('facturas')) || [];

        // Agregar la nueva factura a la lista de facturas
        facturas.push(factura);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('facturas', JSON.stringify(facturas));

        // Actualizar la tabla de facturas
        actualizarTablaFacturas();

        // Limpiar el formulario después de crear la factura
        document.getElementById('formularioFactura').reset();

        // Actualizar el número de factura para la próxima factura
        actualizarNumeroFactura();
    });
});

function actualizarTablaFacturas() {
    const tablaFacturasBody = document.querySelector('#tablaFacturas tbody');
    tablaFacturasBody.innerHTML = ''; // Limpiar la tabla antes de cargar las nuevas facturas

    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    facturas.forEach(factura => {
        const fila = document.createElement('tr');
        const cliente = factura.cliente ? factura.cliente.nombre : 'No especificado'; // Verificar si hay un cliente especificado
        fila.innerHTML = `
            <td>${factura.numFactura}</td>
            <td>${cliente}</td>
            <td>${factura.fecha}</td>
            <td>${calcularTotalFactura(factura)}</td>
            <td><button class="editar-factura" data-numero="${factura.numFactura}">Editar</button></td>
            <td><button class="eliminar-factura" data-numero="${factura.numFactura}">Eliminar</button></td>
        `;
        tablaFacturasBody.appendChild(fila);
    });
}


function mostrarTablaFacturas() {
    const tablaFacturas = document.getElementById('tablaFacturas');
    const sinFacturasMensaje = document.getElementById('sinFacturasMensaje');
    const cuerpoTablaFacturas = document.getElementById('cuerpoTablaFacturas');

    const facturas = JSON.parse(localStorage.getItem('facturas'));

    if (facturas && facturas.length > 0) {
        tablaFacturas.style.display = 'table';
        sinFacturasMensaje.style.display = 'none';
        cuerpoTablaFacturas.innerHTML = ''; // Limpiar la tabla antes de cargar las facturas
        cargarFacturas(); // Cargar las facturas en la tabla
    } else {
        tablaFacturas.style.display = 'none';
        sinFacturasMensaje.style.display = 'block';
    }
}


function cargarFacturas() {
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];

    // Limpiar la tabla antes de cargar las nuevas facturas
    const tablaFacturas = document.getElementById('tablaFacturas');
    tablaFacturas.innerHTML = '';

    const thead = document.createElement('thead');
    const titulos = ['Número de Factura', 'Cliente', 'Fecha', 'Importe', 'Editar', 'Eliminar'];
    const titulosRow = document.createElement('tr');
    titulos.forEach(titulo => {
        const th = document.createElement('th');
        th.textContent = titulo;
        titulosRow.appendChild(th);
    });
    thead.appendChild(titulosRow);
    tablaFacturas.appendChild(thead);

    const tbody = document.createElement('tbody');

    facturas.forEach(factura => {
        const row = document.createElement('tr');

        const numFacturaCell = document.createElement('td');
        numFacturaCell.textContent = factura.numero;
        row.appendChild(numFacturaCell);

        const clienteCell = document.createElement('td');
        clienteCell.textContent = factura.cliente ? factura.cliente.nombre : 'No especificado'; // Mostrar el nombre del cliente si existe
        row.appendChild(clienteCell);

        const fechaCell = document.createElement('td');
        fechaCell.textContent = factura.fecha;
        row.appendChild(fechaCell);

        const importeCell = document.createElement('td');
        importeCell.textContent = factura.importe;
        row.appendChild(importeCell);

        // Botones de editar y eliminar
        const editarCell = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('editar-factura'); // Añadir la clase 'editar-factura'
        btnEditar.setAttribute('data-numero', factura.numero); // Añadir el atributo 'data-numero' con el número de factura
        btnEditar.addEventListener('click', function () {
            editarFactura(factura.numero);
        });
        editarCell.appendChild(btnEditar);
        row.appendChild(editarCell);

        const eliminarCell = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function () {
            confirmarEliminarFactura(factura.numero);
        });
        eliminarCell.appendChild(btnEliminar);
        row.appendChild(eliminarCell);

        tbody.appendChild(row);
    });

    tablaFacturas.appendChild(tbody);
}


function editarFactura(numeroFactura) {
    // Obtener la factura correspondiente al número de factura
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const factura = facturas.find(factura => factura.numFactura === numeroFactura);

    // Llenar el formulario de edición con los datos de la factura
    document.getElementById('numFacturaEditar').value = factura.numFactura;
    document.getElementById('fechaEditar').value = factura.fecha;

    // Cargar las opciones de clientes en el select
    cargarOpcionesClientes('clienteEditar', factura.cliente ? factura.cliente.nif : '');

    // Cargar los conceptos de la factura en el formulario de edición
    cargarConceptosFacturaEditar(factura.conceptos);

    // Mostrar el modal de edición
    const modalEditarFactura = document.getElementById('modalEditarFactura');
    modalEditarFactura.style.display = 'block';
}





function calcularTotalFactura(factura) {
    let total = 0;
    factura.conceptos.forEach(concepto => {
        total += parseFloat(concepto.importe);
    });
    return total.toFixed(2) + ' €';
}




// Función para actualizar los datos del cliente en el div datosCliente
function actualizarDatosCliente() {
    const clienteSeleccionado = obtenerClienteSeleccionado();
    const datosClienteDiv = document.getElementById('datosCliente');

    if (clienteSeleccionado) {
        // Si hay un cliente seleccionado, mostrar sus datos
        datosClienteDiv.innerHTML = `
            <p>Nombre / Razón Social: <strong>${clienteSeleccionado.nombre}</strong></p>
            <p>NIF: <strong>${clienteSeleccionado.nif}</strong></p>
            <p>Dirección: <strong>${clienteSeleccionado.direccion}</strong></p>
            <p>Código Postal: <strong>${clienteSeleccionado.cp}</strong></p>
        `;
    } else {
        // Si no hay cliente seleccionado, mostrar "N/A" en todos los campos
        datosClienteDiv.innerHTML = `
            <p>Nombre / Razón Social: <strong>N/A</strong></p>
            <p>NIF: <strong>N/A</strong></p>
            <p>Dirección: <strong>N/A</strong></p>
            <p>Código Postal: <strong>N/A</strong></p>
        `;
    }
}


// Llamar a la función actualizarDatosCliente al cargar la página para establecer los datos iniciales
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el cliente seleccionado (si lo hay)
    const clienteSeleccionado = obtenerClienteSeleccionado(); // Aquí deberías implementar tu lógica para obtener el cliente seleccionado
    // Actualizar los datos del cliente
    actualizarDatosCliente(clienteSeleccionado);
});

// Llamar a la función actualizarDatosCliente cada vez que se seleccione un cliente diferente
document.getElementById('selectCliente').addEventListener('change', function () {
    // Obtener el cliente seleccionado
    const clienteSeleccionado = obtenerClienteSeleccionado(); // Aquí deberías implementar tu lógica para obtener el cliente seleccionado
    // Actualizar los datos del cliente
    actualizarDatosCliente(clienteSeleccionado);
});



// Para facturas
document.getElementById("anadirConceptoFactura").addEventListener("click", function () {
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
    nuevoImporteInput.addEventListener('blur', function (event) {
        formatearImporte(nuevoImporteInput);
    });
});

// Aplicar la funcionalidad de formateo a los campos de importe existentes al cargar la página
document.querySelectorAll('input[name="importeFactura"]').forEach(importeInput => {
    importeInput.addEventListener('blur', function (event) {
        formatearImporte(importeInput);
    });
});

// Funcionalidad para eliminar conceptos
document.addEventListener("click", function (event) {
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
        option.textContent = cliente.nombre + ' (' + cliente.nif + ')';
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


function obtenerClienteSeleccionado() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const selectCliente = document.getElementById('selectCliente');
    const nifClienteSeleccionado = selectCliente.value;

    // Buscar el cliente correspondiente en la lista de clientes
    const clienteSeleccionado = clientes.find(cliente => cliente.nif === nifClienteSeleccionado);

    return clienteSeleccionado;
}


function actualizarNumeroFactura() {
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    if (facturas.length > 0) {
        // Ordenar las facturas por número de factura de manera descendente
        facturas.sort((a, b) => parseInt(b.numFactura.split('-')[2]) - parseInt(a.numFactura.split('-')[2]));
        // Obtener el número de la última factura
        const ultimaFacturaNumero = parseInt(facturas[0].numFactura.split('-')[2]);
        // Calcular el siguiente número de factura
        const siguienteNumero = ultimaFacturaNumero + 1;
        // Establecer el valor del campo de número de factura
        document.getElementById('numFactura').value = `F-24-${siguienteNumero}`;
    } else {
        // Si no hay facturas, establecer el valor predeterminado
        document.getElementById('numFactura').value = 'F-24-';
    }
}

