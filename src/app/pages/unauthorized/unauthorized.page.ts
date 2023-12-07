import { Component, OnDestroy, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { interval, Subject, EMPTY } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss'],
})
export class UnauthorizedPage {
  public audio!: HTMLAudioElement;
  public stopAudio$ = new Subject<void>();
  private animation?: Animation;

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    // Crear el elemento de audio, pero no reproducir automáticamente
    this.audio = new Audio('../../../assets/unauthorized-audio.mp3');
    this.audio.loop = true;

    // Reproducir el audio después de hacer clic en algún lugar de la página
    document.addEventListener('click', () => {
      this.audio.play().catch((error) => {
        console.error('Error al reproducir el audio:', error);
      });
    });
    interval(67000)
      .pipe(takeUntil(this.stopAudio$))
      .subscribe(() => {
        this.stopAudio();
      });

    this.animateImage();
  }

  ngOnDestroy() {
    this.stopAudio();
    this.stopAudio$.next();
    this.stopAudio$.complete();
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.stopAudio$.next();
  }

  animateImage() {
    const image = document.querySelector('.my-image');

    if (image) {
      this.animation = this.animationCtrl
        .create()
        .addElement(image)
        .duration(3500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(2.5)' },
          { offset: 1, transform: 'scale(1)' },
        ]);

      this.animation.play().catch((error) => {
        console.error('Error al reproducir la animación:', error);
      });
    }
  }
}
