import { Component, Renderer2 } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Options } from 'ngx-qrcode-styling';
import * as CryptoJS from 'crypto-js';
import {BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AsistenciaService } from '../services/asistencia.service';
import { QrLogsResponse } from '../models/qrLogResponse';
import { QrLogRequest } from '../models/qr-log.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string | null = '';
  userType: string = '';
  private claveSecreta = 'miGataSeLlamaSamira'; // Cambia esto con tu clave secreta
  idOriginal: number = 0;
  idEncriptado: string = ''; // Inicializar con cadena vacía
  idDesencriptado: number | null = null;

  mostrarCodigoQR = false;
  mostrarListaAsistencias = false;

  scanResult: string = '';
  isScanning: boolean = false; // Variable para controlar la visibilidad del botón

  fechaSeleccionada!: Date; // Obtén esto desde tu datepicker
  asistencias!: QrLogsResponse[];

  constructor(private usuarioService:UsuarioService, private alertController: AlertController, private renderer: Renderer2, private asistenciaService: AsistenciaService) {
    const state = window.history.state;
    if (state && state.userType) {
      this.userType = state.userType;
    }
  }

  onGenerarQR() {
    this.mostrarCodigoQR = true;
    this.mostrarListaAsistencias = false;
  }

  onBorrarQR() {
    this.mostrarCodigoQR = false;
  }

  ngOnDestroy() {
    BarcodeScanner.showBackground();
    document.body.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    this.isScanning = false;
    this.scanResult = '';
  }

  onVerAsistencia() {
    this.mostrarCodigoQR = false;
    this.mostrarListaAsistencias = !this.mostrarListaAsistencias;
    this.idOriginal = this.getUserId();
    const formattedFecha = this.formatFechaSeleccionada(this.fechaSeleccionada);

    if (this.idOriginal && this.fechaSeleccionada) {
      this.asistenciaService
        .getAsistencias(this.idOriginal, formattedFecha)
        .subscribe({
          next: (asistencias) => {
            this.asistencias = asistencias;
          },
          error: (error) => {
            console.error('Error al obtener asistencias:', error);
            // Maneja el error según tus necesidades
          },
        });
    } else {
      console.error('ID del profesor o fecha seleccionada no válidos');
      // Puedes mostrar un mensaje al usuario indicando que los datos son inválidos
    }
  }

  guardarAsistencia() {
    this.idDesencriptado = this.desencriptarId(this.scanResult);
    this.idOriginal = this.getUserId()
    const qrLogRequest: QrLogRequest = {
      idProfesor: this.idDesencriptado,
      idAlumno: this.idOriginal
    };

    this.asistenciaService.guardarAsistencia(qrLogRequest)
      .subscribe({
        next: (mensaje) => {
          console.log(mensaje);
          // Realizar acciones adicionales después de guardar la asistencia
        },
        error: (error) => {
          console.error('Error al guardar asistencia:', error);
          // Manejar el error según tus necesidades
        },
      });
  }

  
  
  


  borrarAsistencia(idQrLog: number) {
    this.asistenciaService
      .borrarAsistencia(idQrLog)
      .subscribe({
        next: (mensaje) => {
          console.log(mensaje);
          this.idOriginal = this.getUserId();
          const formattedFecha = this.formatFechaSeleccionada(this.fechaSeleccionada);
          // Actualizar la lista de asistencias o realizar otras acciones necesarias
          if (this.idOriginal && this.fechaSeleccionada) {
            this.asistenciaService
              .getAsistencias(this.idOriginal, formattedFecha)
              .subscribe({
                next: (asistencias) => {
                  this.asistencias = asistencias;
                },
                error: (error) => {
                  this.asistencias = [];
                  console.error('Error al obtener asistencias:', error);
                  // Maneja el error según tus necesidades
                },
              });
          } else {
            console.error('ID del profesor o fecha seleccionada no válidos');
            // Puedes mostrar un mensaje al usuario indicando que los datos son inválidos
          }
        },
        error: (error) => {
          console.error('Error al borrar asistencia:', error);
          // Manejar el error según tus necesidades
        },
      });
  }
  
  formatFechaSeleccionada(selectedDate: Date): string {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  async startScan() {
    // Configura la interfaz transparente y muestra el botón de cierre
    document.body.classList.add('scanner-active');
    BarcodeScanner.hideBackground();
    this.isScanning = true; // Hace visible el botón de cierre

    // Inicia el escaneo
    const result = await BarcodeScanner.startScan();

    // Actualiza el resultado del escaneo
    if (result.hasContent) {
      this.scanResult = result.content;
      this.guardarAsistencia();
      
    } else {
      this.scanResult = 'Escaneo cancelado';
    }

    // Remueve la clase 'scanner-active' para volver a la interfaz normal
    BarcodeScanner.showBackground();
    document.body.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    this.isScanning = false; // Oculta el botón de cierre
  }

  closeScanner() {
    BarcodeScanner.showBackground();
    document.body.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    this.isScanning = false;
    // Resetea el resultado y oculta la interfaz de escaneo
    this.scanResult = '';
  }

  
  
  askUser() {
    const c = confirm('Do you want to scan a barcode?');
  
    if (c) {
      this.checkPermission();
      this.startScan();
    }
  };


  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted){
        resolve(true);
      } else if (status.denied){
        const alert = await this.alertController.create({
          header: 'No tienes persmisos',
          message: 'Porfavor habilita los permisos para la camara en tus configuraciones.',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Abre configuraciones',
            handler: () =>{
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }]
        });
        await alert.present();
      }else{
        resolve(false);
      }
    })
  };





  private encriptarId(id: number): string {
    const idString = id.toString();
    return CryptoJS.AES.encrypt(idString, this.claveSecreta).toString();
  }

  private desencriptarId(encryptedId: string): number {
    const bytes = CryptoJS.AES.decrypt(encryptedId, this.claveSecreta);
    const idString = bytes.toString(CryptoJS.enc.Utf8);
    return parseInt(idString, 10);
  }
  
  getUserId(): number{
    const userInfo = this.usuarioService.getUserInfo();
  
    // Verificación de nulidad con if
    if (userInfo !== null && userInfo !== undefined && userInfo.id !== null && userInfo.id !== undefined) {
      return userInfo.id;
    } else {
      return 0;
    }
  }

  
  
  public config: Options = {
    width: 300,
    height: 300,
    data: this.encriptarId(this.getUserId()),
    image: "../../assets/gatoqr.png",
    margin: 5,
    dotsOptions: {
      color: "#black",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      hideBackgroundDots: false,
      crossOrigin: "anonymous",
      margin: 0,
      imageSize: 0.8
    }
  };
}