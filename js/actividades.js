/*
* Clase que modela la entidad Actividades 
 */

class Actividades{

    /**
     * Constructor para inicializar la clase Actividades
     * @param {*} dia el dia de la actividad
     * @param {*} hora la hora de la actividad
     * @param {*} descripcion la descripcion de la actividad
     */
    constructor(dia,hora,descripcion){
        this.dia = dia;
        this.hora = hora;
        this.descripcion = descripcion;
        this.id = -1;
    }

    /**
     * Muestra la concatenacion de los atributos de la clase
     * @returns una cadena de caracteres con los atributos concatenados
     */
    mostrar_actividad(){

        return (this.id + " - " + this.dia + " - " + (this.hora + "hs") + " - " + this.descripcion);
    }
    /**
    * Se setea el nuevo valor de id
    * @param {*} nuevo_id el nuevo id a setear
    */
    set_id(nuevo_id){

        this.id = nuevo_id;
        
    }

}