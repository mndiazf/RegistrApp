import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ServiciousuarioService } from 'src/app/services/serviciousuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';

  constructor(private animationCtrl: AnimationController, private router: Router, private serviceUsuario:ServiciousuarioService) { }

  //Implementacion de navigation extras
  submitForm() {
    if (this.username.trim() !== '') {
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.username
        }
      };
      this.serviceUsuario.capturarUsuario(this.username);

      setTimeout(() => {
        this.router.navigate(['/home'], navigationExtras);
      }, 300);
    } else {
    }
  }
  
  

  ngOnInit() {
  }

  //Implementacion de animaciones Ionic 
    playAnimation() {
      const loginButton = document.querySelector('.login-button');
      const animation = this.animationCtrl
      if (loginButton) {
        const animation = this.animationCtrl
          .create()
          .addElement(loginButton)
          .duration(200)
          .iterations(1)
          .keyframes([
            { offset: 0, transform: 'scale(1)' }, // Estado inicial (tamaño normal)
            { offset: 0.25, transform: 'scale(1.05)' }, // Escala al doble del tamaño
            { offset: 0.5, transform: 'scale(1)' }, // Vuelve al tamaño normal
            { offset: 0.75, transform: 'scale(1.05)' }, // Escala al doble del tamaño nuevamente
            { offset: 1, transform: 'scale(1)' }, // Vuelve al tamaño normal
          ]);

      animation.play(); // Inicia la animación
    }
  
  }
}
