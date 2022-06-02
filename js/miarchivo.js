/*  Funcion:
Guarda la actividad en el local Storage y recarga de forma forzada al html */
const agregarActividad = (ls, actividad) =>{
    ls.setItem(actividad.id, JSON.stringify(actividad))
    window.location.href = './'
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

