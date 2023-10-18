import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  capturarUsuario(usuario: string): void {
    localStorage.setItem('username', usuario);
  }

  obtenerUsuario(): string | null {
    return localStorage.getItem('username');
  }
}
