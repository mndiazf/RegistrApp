import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should capture and retrieve the username', () => {
    const username = 'testUser';

    // Borra cualquier nombre de usuario existente
    localStorage.removeItem('username');

    // Capture el nombre de usuario
    service.capturarUsuario(username);

    // Recupera el nombre de usuario y verifica si coincide
    const retrievedUsername = service.obtenerUsuario();
    expect(retrievedUsername).toBe(username);
  });

  it('should return null if no username is captured', () => {
    // Borra cualquier nombre de usuario existente
    localStorage.removeItem('username');

    // Asegúrate de que al obtener el nombre de usuario sin capturarlo devuelva null
    const retrievedUsername = service.obtenerUsuario();
    expect(retrievedUsername).toBeNull();
  });
});
