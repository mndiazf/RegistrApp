import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoResponse } from '../models/user-info-response.model';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://54.80.209.214:8080/api/auth'; // Mantenido como HTTP

  constructor() {}

  login(username: string, password: string): Observable<UserInfoResponse> {
    const loginRequest = { username, password };

    const options = {
      url: `${this.baseUrl}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: loginRequest,
    };

    return new Observable((observer) => {
      CapacitorHttp.post(options)
        .then((response: HttpResponse) => {
          if (response.data instanceof Object) {
            const userInfo: UserInfoResponse = response.data as UserInfoResponse;
            observer.next(userInfo);
            observer.complete();
          } else {
            console.error('Error al iniciar sesión - Respuesta no válida del servidor:', response.data);
            observer.error('Error al iniciar sesión - Respuesta no válida del servidor');
          }
        })
        .catch((error: HttpErrorResponse) => {
          console.error('Error al iniciar sesión:', error);

          // Mostrar detalles específicos del error si están presentes
          const errorMessage = error?.error || 'Error desconocido al iniciar sesión';

          observer.error(errorMessage);
        });
    });
  }
}