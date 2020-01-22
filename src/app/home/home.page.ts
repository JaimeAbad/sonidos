import { Component } from '@angular/core';

import { Animal } from '../../interfaces/animal.interface'

import { ANIMALES } from 'src/data/data.animales';
import { AnimalesService } from '../app/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //@ViewChild (IonReorderGroup) reorderGroup: IonReorderGroup;

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Desplazando el elemento', ev.detail.from, 'a', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  /*
  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }*/

  update(event){
    let checked:boolean=event.detail.checked;

    if(checked){
      this.ordenar=false
    } else {
      this.ordenar=true
    }
  }

  animales: Animal[]=[];
  ordenar:boolean=true;

  audio=new Audio();

  audioTiempo:any;

  constructor(private animalService: AnimalesService) {
    this.animales=animalService.getAnimales();
  }

  borrarAnimal (animal: Animal){
    console.log('Deleting ' + animal.nombre);
    //this.animalService.borrarAnimal(animal);
    this.pausar_audio(animal);
    var index=this.animales.indexOf(animal);
    this.animales.splice(index,1);
  }

  private pausar_audio(animalSeleccionado: Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();

    this.audio.currentTime=0;

    for(let animal of this.animales){
      if(animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo=false;
      }
    }
  }

  reproducir(animal: Animal){

    console.log('Reproduciendo ' + animal);

    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo=false;
      return;

    }

    this.audio.src=animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo=true;

    setTimeout( ()=> animal.reproduciendo=false, animal.duracion *1000);
  }

  /*

  */
  doRefresh(event){
    console.log('Refreshing...');

    setTimeout(() => {
      console.log('Refrescar completado')
      event.target.complete();
      this.animales=ANIMALES.slice(0);
    }, 500);
  }


  onRenderItems(event){
    console.log('Movinnng');
    let draggedItem=this.animales.splice(event.detail.from,1)[0];
    this.animales.splice(event.detail.to,0,draggedItem);
    event.detail.complete();
  }

}
