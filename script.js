
// Interacción con el usuario seleccionando cantidad de  personas
// Guardar cantidad de personas en el localStorage 

document.addEventListener('DOMContentLoaded', function() {
    const agregarForm = document.querySelector("#agregar-form");
    const agregarInput = document.querySelector("#agregar-input");
    const agregar = document.querySelector("#agregar");
    const chooseButton = document.getElementById('choose-button');
    const datetimeInput = document.querySelector("#datetime");

    const selectedDateTime = {
        dateTime: null
    };

    // Inicialmente deshabilitar el campo de calendario y el botón de seleccionar
    datetimeInput.disabled = true;
    chooseButton.disabled = true;

    // Función para manejar el envío del formulario
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
            flatpickr("#datetime", {
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
                onDayCreate: function(dObj, dStr, fp, dayElem) {
                    const date = dayElem.dateObj;
                    const fechaStr = date.toISOString().split('T')[0];
                    const esFechaOcupada = reservas.some(reserva => reserva.dateTime.includes(fechaStr));
                    if (esFechaOcupada) {
                        dayElem.classList.add('flatpickr-disabled');
                    }
                },
                onChange: function(selectedDates, dateStr) {
                    selectedDateTime.dateTime = dateStr;
                    // Guardar la fecha seleccionada en localStorage
                    localStorage.setItem("Fecha seleccionada", dateStr);
                }
            });

            // Mostrar los horarios no disponibles inicialmente
            datetimeInput.disabled = true;
            chooseButton.disabled = true;
        });

    // Event listener para el envío del formulario
    agregarForm.addEventListener("submit", agregarPersonas);

    // Event listener para el botón de elegir
    chooseButton.addEventListener('click', function() {
        if (selectedDateTime.dateTime) {
            console.log("Fecha y hora seleccionada:", selectedDateTime);
            alert("Fecha y hora seleccionada: " + selectedDateTime.dateTime);
        } else {
            alert("Por favor, selecciona una fecha y hora.");
        }
    });
});
// deberia poder hacer que se tome informacion del json para verificar y mostrar al usuario los horarios y fechas que no nestan disponibles
//antes de que empiece a elegir y que estos dias y horarios ocupados se pinten de rojo

/*_______________________________________________________________________________________________*/ 

// FORMULARIO

