import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciousuarioService } from '../services/serviciousuario.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private getnames: ServiciousuarioService, private router: Router) {}
  canActivate(): boolean {
    const usuarioCapturado = this.getnames.obtenerUsuario();
    if (usuarioCapturado) {
      return true; // Usuario capturado, permitir acceso
    } else {
      this.router.navigate(['/noautorizado']); // Usuario no capturado, redirigir a la página de error
      return false;
    }
  }
  
}
