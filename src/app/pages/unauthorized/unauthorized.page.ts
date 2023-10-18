import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss'],
})
export class UnauthorizedPage implements OnInit {
  private audio!: HTMLAudioElement;
  private stopAudio$ = new Subject<void>();


  constructor(private animationCtrl: AnimationController) { }

  
  ngOnInit() {
    this.audio = new Audio('../../../assets/unauthorized-audio.mp3');
    this.audio.loop = true; // Reproducir el audio en bucle

    // Reproducir el audio durante 10 segundos
    interval(67000).pipe(takeUntil(this.stopAudio$)).subscribe(() => {
      this.stopAudio();
    });

    this.audio.play();
    this.animateImage()
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.stopAudio$.next();
  }

  ngOnDestroy() {
    this.stopAudio();
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
}
