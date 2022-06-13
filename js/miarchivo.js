/*  Funcion:
Guarda la actividad en el local Storage y recarga de forma forzada al html */
const agregarActividad = (ls, actividad) =>{
    ls.setItem(actividad.id, JSON.stringify(actividad))
    window.location.href = './'
}

// Lee las actividades guardadas en el Local Storage
const actividadesCargadas = (ls, parentNode) =>{
    let claves = Object.keys(ls)
    console.log(claves)
    for (clave of claves){
        let actividad = JSON.parse(ls.getItem(clave))
        crearActividad(parentNode, actividad, ls)
    }
}

// Genera los elementos html
const crearActividad = (parentNode, actividad) =>{
    let liActividad = document.createElement('li')
    let dateActivity = document.createElement('p')
    let hourActivity = document.createElement('p')
    let descriptionActivity = document.createElement('p')

    hourActivity.innerHTML = actividad.hour
    dateActivity.innerHTML = actividad.day
    descriptionActivity.innerHTML = actividad.description
    
    liActividad.classList.add("clean-activity")

    // Elimina dichos elementos utilizando la librería SweetAlert2
    liActividad.onclick = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You are going to delete the activity of "+ actividad.day + " at " + actividad.hour + " for " + actividad.description,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2f353a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                ls.removeItem(actividad.id)
                window.location.href = '/'
            }
        })
    }

    liActividad.appendChild(dateActivity)
    liActividad.appendChild(hourActivity)
    liActividad.appendChild(descriptionActivity)

    parentNode.appendChild(liActividad)
} 

// Obtengo datos del html y los guardo en variables y constantes

let day = document.querySelector('.form-day');
let hour = document.querySelector('.form-hour');
let description = document.querySelector('.form-description');
let bttnAgregarActividad = document.querySelector('.form-button');
let listadoActividades = document.querySelector('.list-events');

// Guardo al local storage en una constante
const ls = window.localStorage;

// Evento producido por realizar click en el boton
bttnAgregarActividad.onclick = () =>{
    let actividad = {
        id: Math.random(1, 100),
        day: day.value,
        hour: hour.value,
        description: description.value,
    }
    agregarActividad(ls, actividad);
}

actividadesCargadas(ls, listadoActividades);