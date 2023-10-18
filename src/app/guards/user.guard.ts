import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private getnames: UsuarioService, private router: Router) {}
  canActivate(): boolean {
    const usuarioCapturado = this.getnames.obtenerUsuario();
    if (usuarioCapturado) {
      return true; // Usuario capturado, permitir acceso
    } else {
      this.router.navigate(['/unauthorized']); // Usuario no capturado, redirigir a la página de error
      return false;
    }
  }
}
