import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-noautorizado',
  templateUrl: './noautorizado.page.html',
  styleUrls: ['./noautorizado.page.scss'],
})
export class NoautorizadoPage implements OnInit {

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
    
  }
  animateImage() {
    const image = document.querySelector('.my-image');
    if (image) {
      const animation = this.animationCtrl.create()
        .addElement(image)
        .duration(3500) // Duración de la animación en milisegundos
        .iterations(Infinity) // Iterar la animación infinitamente
        .keyframes([
          { offset: 0, transform: 'scale(1)' }, // Tamaño original
          { offset: 0.5, transform: 'scale(2.5)' }, // Escalar a 1.5 veces
          { offset: 1, transform: 'scale(1)' }, // Tamaño original nuevamente
        ]);
      animation.play();
      
    }
  }

  ionViewDidEnter() {
    this.animateImage(); // Iniciar la animación cuando la página se carga
  }
  
}
