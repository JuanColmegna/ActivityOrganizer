//API KEY
const API_KEY = 'ac80411a51978795a765241808118988';

//consigo ubicacion y utilizo un operador ternario para generar un mensaje si el usuario debe abrigarse o no según su geolocalizacion

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            let element = document.getElementById('weather')
            data.main.temp < 15 ? element.innerHTML = "<p>Today is a cold day, wrap up!</p>" : "<p>It's a sun day, go out!</p>";
        })
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}

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