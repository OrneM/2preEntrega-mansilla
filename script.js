    //Creación del calendario 

    const monthYearElement = document.getElementById("month-year")
    const datesElement = document.getElementById("dates")
    const prevBtn = document.getElementById("prev")
    const nextBtn = document.getElementById("next")

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let currentDate = new Date()

    function renderCalendar() {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const firstDayIndex = new Date(year, month, 1).getDay()
        const lastDay = new Date(year, month + 1, 0).getDate()
        
        monthYearElement.textContent = `${monthNames[month]} ${year}`

        datesElement.innerHTML = ''

        for (let i = 0; i < firstDayIndex; i++) {
            datesElement.innerHTML += `<div class="date empty"></div>`
        }

        for (let i = 1; i <= lastDay; i++) {
            let divDay = document.createElement('div')
            divDay.className = "date"
            divDay.textContent = i
            datesElement.appendChild(divDay)
            }
    }


    function changeMonth(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction)
        renderCalendar()
    }

    prevBtn.addEventListener('click', () => changeMonth(-1))
    nextBtn.addEventListener('click', () => changeMonth(1))

    renderCalendar()
   

/*_______________________________________________________________________________________________*/
// Interacción con el usuario seleccionando cantidad de  personas
// Guardar cantidad de personas en el localStorage 

const agregarForm = document.querySelector("#agregar-form");
const agregarInput = document.querySelector("#agregar-input");
const agregar = document.querySelector("#agregar");

agregarForm.addEventListener("submit", agregarPersonas);

function agregarPersonas(e) {
    e.preventDefault();

    const inputValue = parseInt(agregarInput.value, 10);

    agregar.innerHTML = "";

    if (inputValue >= 1 && inputValue <= 8) {
        localStorage.setItem("Cantidad de personas", inputValue);
        let divCantidadElegida = document.createElement("div");
        divCantidadElegida.className = "cantidadElegida";
        divCantidadElegida.innerText = " ✅ Hay mesas disponibles, elija una fecha";
        divCantidadElegida.classList.add("visible");
        agregar.append(divCantidadElegida);
    } else {
        let divCantidadElegida = document.createElement("div");
        divCantidadElegida.className = "cantidadElegida";
        divCantidadElegida.innerText = " ❌ Elija una opción válida";
        divCantidadElegida.classList.add("visible");
        agregar.append(divCantidadElegida);
    }

    agregarInput.focus();
    agregarForm.reset();
}
