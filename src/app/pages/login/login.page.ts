import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { UserInfoResponse } from 'src/app/models/user-info-response.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  username: string = '';
  password: string = '';
  userType: string = '';

  constructor(private router:Router,private loginService:LoginService, private serviceUsuario:UsuarioService, private alertController: AlertController) {

  }

  ngOnInit() {
  }

  async submitForm() {
    try {
      const userInfoResponse: UserInfoResponse = await firstValueFrom(this.loginService.login(this.username, this.password));
  
      if (userInfoResponse) {
        this.serviceUsuario.setUserInfo(userInfoResponse.id, userInfoResponse.username, userInfoResponse.userType);
        this.serviceUsuario.capturarUsuario(this.username);
  
        const navigationExtras: NavigationExtras = {
          state: {
            userType: userInfoResponse.userType
          }
        };
  
        this.router.navigate(['/home'], navigationExtras);
      } else {
        this.mostrarMensajeEmergente('Usuario no encontrado o inválido');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', JSON.stringify(error));
  
      if (error && error.status === 401) {
        this.mostrarMensajeEmergente('Usuario o contraseña incorrectos');
      } else if (error && error.error) {
        // Si hay información específica del error en el objeto
        this.mostrarMensajeEmergente(`Error al iniciar sesión: ${error.error}`);
      } else {
        this.mostrarMensajeEmergente('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  }
  
  

  
  async mostrarMensajeEmergente(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}