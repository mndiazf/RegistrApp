import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  username: string = '';

    // Funcion para redireccionar al login
  submitForm() {
    // Aquí puedes agregar cualquier lógica adicional antes de redirigir

    // Redirige al usuario a la página de inicio (cambia 'login' al nombre de tu ruta)
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {}

  ngOnInit() {
  }

}