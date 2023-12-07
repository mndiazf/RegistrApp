import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userId: number | null = null;
  private username: string | null = null;
  private userType: string | null = null;

  setUserInfo(id: number, username: string, userType: string): void {
    this.userId = id;
    this.username = username;
    this.userType = userType;
  }

  getUserInfo(): { id: number | null, username: string | null, userType: string | null } {
    return {
      id: this.userId,
      username: this.username,
      userType: this.userType,
    };
  }

  constructor() { }
  capturarUsuario(usuario: string): void {
    localStorage.setItem('username', usuario);
  }

  obtenerUsuario(): string | null {
    return localStorage.getItem('username');
  }
}
