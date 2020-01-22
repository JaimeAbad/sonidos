import { Injectable } from '@angular/core';
import { Animal } from 'src/interfaces/animal.interface';
import { ANIMALES } from 'src/data.animales';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  //Creamos un array vacío de animales
  animales:Animal[]=[];

  /*Creamos el array:
      Con el método slice hacemos una copia del array referencia, de esta forma no trabajaremos con
      el original y sí con una copia.*/
  constructor() {
    this.animales=ANIMALES.slice(0)
  }

  /* Método borrarAnimal
      Creamos un índice, el cual igualaremos a la posición del animal en el array, posteriormente
      lo eliminaremos.
      Con el método splice(index, i), borramos el elemento deseado del array.
  */
  borrarAnimal(animal: Animal){
    var index=this.animales.indexOf(animal);
    this.animales.splice(index,1);
  }


  getAnimales(): Animal[]{
    return this.animales;
  }
}
