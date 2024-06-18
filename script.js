
// Interacción con el usuario seleccionando cantidad de  personas
// Guardar cantidad de personas en el localStorage 

document.addEventListener('DOMContentLoaded', function() {
    const agregarForm = document.querySelector("#agregar-form");
    const agregarInput = document.querySelector("#agregar-input");
    const agregar = document.querySelector("#agregar");
    const chooseButton = document.getElementById('choose-button');
    const datetimeInput = document.querySelector("#datetime");
    const dateTimeContainer = document.querySelector("#date-time-container");
    const datosReservaDiv = document.querySelector("#datos-reserva");
    const confirmarReservaForm = document.querySelector("#confirmar-reserva-form");

    const selectedDateTime = {
        dateTime: null
    };

    // Función para manejar el envío del formulario inicial
    function agregarPersonas(e) {
        e.preventDefault();
        const inputValue = parseInt(agregarInput.value, 10);
        agregar.innerHTML = "";

        let divCantidadElegida = document.createElement("div");
        divCantidadElegida.className = "cantidadElegida";

        if (inputValue >= 1 && inputValue <= 8) {
            localStorage.setItem("Cantidad de personas", inputValue);
            divCantidadElegida.innerText = " ✅ Hay mesas disponibles, elija una fecha";
            divCantidadElegida.classList.add("visible");
            datetimeInput.disabled = false; // Habilitar el campo de calendario
            chooseButton.disabled = false; // Habilitar el botón de seleccionar
        } else {
            divCantidadElegida.innerText = " ❌ Elija una opción válida";
            divCantidadElegida.classList.add("visible");
            datetimeInput.disabled = true; // Deshabilitar el campo de calendario
            chooseButton.disabled = true; // Deshabilitar el botón de seleccionar
        }

        agregar.append(divCantidadElegida);
        agregarInput.focus();
        agregarForm.reset();
    }

    // Cargar y procesar reservas desde el archivo JSON
    fetch('reservas.json')
        .then(response => response.json())
        .then(data => {
            const reservas = data.map(reserva => {
                return {
                    dateTime: reserva.fechaHora,
                    cantidad: reserva.cantidad
                };
            });

            // Inicializar el calendario Flatpickr
            const fp = flatpickr("#datetime", {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true,
                defaultHour: 17,
                minTime: "17:00",
                maxTime: "23:30",
                minuteIncrement: 15,
                minDate: "today",
                locale: {
                    firstDayOfWeek: 1 // Lunes es el primer día de la semana
                },
                disable: reservas.map(reserva => new Date(reserva.dateTime)),
                onChange: function(selectedDates, dateStr) {
                    selectedDateTime.dateTime = dateStr;
                    
                }
            });

            // Mostrar los horarios no disponibles inicialmente
            datetimeInput.disabled = true;
            chooseButton.disabled = true;
        });

    // Función para mostrar el mensaje de confirmación con la fecha seleccionada
    function mostrarMensajeConfirmacion() {
        // Limpiar mensajes anteriores si los hay
        let mensajeExistente = document.querySelector(".fechaElegida");
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
    
        // Obtener la fecha seleccionada del localStorage
        let fechaSeleccionada = localStorage.getItem("Fecha seleccionada");
    
        if (fechaSeleccionada) {
            let divFechaElegida = document.createElement("div");
            divFechaElegida.className = "fechaElegida";
            divFechaElegida.innerText = ` ✅ Fecha y hora seleccionada: ${fechaSeleccionada}`;
            divFechaElegida.classList.add("visible");
            agregar.append(divFechaElegida);
        }
    }

    // Event listener para el envío del formulario inicial
    agregarForm.addEventListener("submit", agregarPersonas);
    chooseButton.addEventListener("click", function() {
        // Guardar la fecha seleccionada en localStorage
        localStorage.setItem("Fecha seleccionada", selectedDateTime.dateTime);
        // Ocultar el contenedor de fecha y hora después de seleccionar
        dateTimeContainer.classList.add('hidden');
        // Mostrar mensaje de confirmación con la fecha seleccionada
        mostrarMensajeConfirmacion();
        // Mostrar el formulario de datos para confirmar reserva
        datosReservaDiv.classList.remove('hidden');
    })

    // Event listener para el envío del formulario de confirmación de reserva
    confirmarReservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.querySelector("#nombre").value;
        const apellido = document.querySelector("#apellido").value;
        const celular = document.querySelector("#celular").value;

        // Aquí podrías enviar los datos del usuario a tu backend o hacer el proceso necesario
        // para confirmar la reserva

        // Por ejemplo, mostrar un mensaje de confirmación
        alert(`Reserva confirmada para ${nombre} ${apellido} con número de celular ${celular}.`);

        // Limpia el localStorage
        localStorage.removeItem("Cantidad de personas");
        localStorage.removeItem("Fecha seleccionada");

        // Reiniciar el formulario y estado de la aplicación
        agregarForm.reset();
        datetimeInput.disabled = true;
        chooseButton.disabled = true;
        datosReservaDiv.classList.add('hidden');
    });
});
// deberia poder hacer que se tome informacion del json para verificar y mostrar al usuario los horarios y fechas que no nestan disponibles
//antes de que empiece a elegir y que estos dias y horarios ocupados se pinten de rojo

/*_______________________________________________________________________________________________*/ 

// FORMULARIO

