// aquí guardare las actividades

let arreglo_actividad = new Array();
let gen_id = 1;

alert("¡Aquí podrás registrar tus actividades del mes!");

let flag = true;

while(flag){
    
    let mensaje = "Indique lo que desea hacer:"

    mensaje += "\n1)Cargar una nueva actividad";
    mensaje += "\n2)Eliminar una nueva actividad";
    mensaje += "\n3)Mostrar actividades";
    mensaje += "\n4)Salir";

    let resp = prompt(mensaje);

        switch(resp) {

            case "1":
                ingresar_nueva_actividad();
                break;
            
            case "2":
                eliminar_actividad();
                break;
            case "3":
                mostrar_actividades();
                break;
            case "4":
                alert("Gracias por utilizar nuestra página");
                flag=false;
                break;
            case null:
                alert("Gracias por utilizar nuestra página");
                flag=false;
                break;
            default :
                alert("No ingreso una opción válida");
        }
}

//función para ingresar nueva actividad

function ingresar_nueva_actividad(){

    let actividad = solicitar_datos_actividad();

    if(actividad){

        actividad.set_id(gen_id);
        gen_id ++;
        arreglo_actividad.push(actividad);
        alert("Actividad agregada en la agenda");
    }

}

/**
 * función para solicitar nueva actividad
 * @returns nuevo objeto Actividades
 */

function solicitar_datos_actividad(){

    let check = true;

    while(check){

        let msj = "";

        let dia = prompt("Ingrese fecha de la actividad").trim();

        let hora = prompt("Ingrese hora de la actividad").trim();
        
        let descripcion = prompt("Ingrese descripción de la actividad").trim();

        if(!dia){
            msj += "\nDebe ingresar un día";
        }

        if(!hora){
            msj += "\nDebe ingresar una hora";
        }

        if(!descripcion){
            msj += "\nDebe ingresar una descripción";
        }

        if(msj != ""){
            alert(msj);
            check = confirm("¿Desea cargar de nuevo la actividad?");
        } else {

            return new Actividades(dia,hora,descripcion);
        
        }
    }

}

// función para eliminar actividad

function eliminar_actividad(){

    if(existe_actividad){

        let id_ingresado = prompt("Ingrese el id de la actividad a eliminar");

        if(id_ingresado){

            let actividad_encontrada = arreglo_actividad.find((a) => a.id == id_ingresado);

            if(actividad_encontrada){

                let resp = confirm("Está seguro que desea eliminar la actividad"+ actividad_encontrada.mostrar_actividad());
                if(resp){
                    arreglo_actividad = arreglo_actividad.filter((a) => a.id != id_ingresado);
                    alert("La actividad fue eliminada con éxito");
                }

            }
        }

    }

}

// validacion de existencia de actividades

function existe_actividad(){

    if(arreglo_actividad.length == 0) {

        alert("No existen actividades");
        return false;

    }

    return true;
}


// función para mostrar actividades 

function mostrar_actividades(){

    if(existe_actividad()){

        let resp = prompt("Desea verla en forma ordenada cronológicamente ascendente(A) o desea verla ordenada cronológicamente descendente(B)".toUpperCase())

        if(resp == "A"){
            
            arreglo_actividad.sort((a,b) => {
                if(a.hora > b.hora){

                    return 1;
                
                }

                if (a.hora < b.hora){

                    return -1;
                
                }

                return 0;

            });
        }

        if(resp == "B"){
            
            arreglo_actividad.sort((a,b) => {
                if(a.hora > b.hora){

                    return -1;
                
                }

                if (a.hora < b.hora){

                    return 1;
                
                }

                return 0;

            });
        }

        mostrar_arreglo();

    }

}


// funcion para mostrar arreglo

function mostrar_arreglo() {
    let mensaje = "Las actividades agendadas son";

    arreglo_actividad.forEach((actividad)=> {
        mensaje += "\n" + actividad.mostrar_actividad();
    })

    alert(mensaje);
}
