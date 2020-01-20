import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ANIMALES } from 'src/data.animales';
import { Animal } from 'src/interfaces/animal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: Animal[] = [];

  /*Para tener una unica referencia.
  **Funcionalidad HTML5
  */
  audio = new Audio();

  //Variable para poder controlar el timeout
  audioTiempo: any;


  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.splice(0);
  }

  reproducir(animal: Animal){
    this.pausarAudio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }


    //Reproduccion del sonido
    // let audio = new Audio(); funcionalidad html
    this.audio.src = animal.audio;

    //Para que suene
    this.audio.load();
    this.audio.play();

    //cambiamos el estado
    animal.reproduciendo = true;


    /*Para controlar que ya se esta reproduciendo el animal y cambiar su estado*/
    this.audioTiempo = setTimeout(()=> animal.reproduciendo = false, animal.duracion*1000);
  }

  private pausarAudio(animalSeleccionado: Animal){
    //Limpiamos el timeout
    clearTimeout(this.audioTiempo);

    this.audio.pause();

    //Para que se ponga al inicio del audio
    this.audio.currentTime = 0;


    /*Obtenemos nuestro arreglo de animales y poner que ninguno se está
    reproduciendo a EXCEPCION del animal seleccionado*/
    for(let animal of this.animales){
      if(animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo= false;
      }
    }
  }

  borrarAnimal(index : number){
    this.animales.splice(index,1);

  }
// este metodo sera para que al recargar la pagina refresque y tengamos los animales del ppio
  recargarAnimales(refresher: any){
    console.log('Inicio del refresh');

    setTimeout(() => {
      console.log('Termino el refresh');
      this.animales = ANIMALES.slice(0);

      refresher.complete();
    },1500);
}

}
