import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QrLogsResponse } from '../models/qrLogResponse';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { QrLogRequest } from '../models/qr-log.model';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'http://54.80.209.214:8080/api/qrlogs'; // Asegúrate de ajustar la URL según tu configuración

  constructor(private http: HttpClient) {}

  getAsistencias(idProfesor: number, fecha: string): Observable<QrLogsResponse[]> {
    const url = `${this.apiUrl}/by-profesor?idProfesor=${idProfesor}&fecha=${fecha}`;

    const options = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Cambiado a 'application/json'
      },
    };

    return new Observable((observer) => {
      CapacitorHttp.get(options)
        .then((response: HttpResponse) => {
          if (response.data instanceof Array) {
            const asistencias: QrLogsResponse[] = response.data as QrLogsResponse[];
            observer.next(asistencias);
            observer.complete();
          } else {
            console.error('Error al obtener asistencias - Respuesta no válida del servidor:', response.data);
            observer.error('Error al obtener asistencias - Respuesta no válida del servidor');
          }
        })
        .catch((error: HttpErrorResponse) => {
          console.error('Error al obtener asistencias:', error);

          // Mostrar detalles específicos del error si están presentes
          const errorMessage = error?.error || 'Error desconocido al obtener asistencias';

          observer.error(errorMessage);
        });
    });
  }
  borrarAsistencia(idQrLog: number): Observable<string> {
    const url = `${this.apiUrl}/borrar/${idQrLog}`;

    const options = {
      url: url,
      method: 'DELETE',
    };

    return new Observable((observer) => {
      CapacitorHttp.request(options)
        .then((response: HttpResponse) => {
          if (response.status === 200) {
            observer.next('QrLog borrado exitosamente');
            observer.complete();
          } else {
            console.error('Error al borrar asistencia:', response);
            observer.error('Error al borrar asistencia');
          }
        })
        .catch((error: HttpErrorResponse) => {
          console.error('Error al borrar asistencia:', error);
          observer.error('Error al borrar asistencia');
        });
    });
  }

  guardarAsistencia(qrLogRequest: QrLogRequest): Observable<string> {
    const url = `${this.apiUrl}/guardar`;

    const options = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: qrLogRequest,
    };

    return new Observable((observer) => {
      CapacitorHttp.request(options)
        .then((response: HttpResponse) => {
          if (response.status === 200) {
            observer.next('QrLog guardado exitosamente');
            observer.complete();
          } else {
            console.error('Error al guardar asistencia:', response);
            observer.error('Error al guardar asistencia');
          }
        })
        .catch((error: HttpErrorResponse) => {
          console.error('Error al guardar asistencia:', error);
          observer.error('Error al guardar asistencia');
        });
    });
  }
}
