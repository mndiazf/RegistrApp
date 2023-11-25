import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username from state', () => {
    const username = 'testUser';

    // Simula el estado de la historia con un nombre de usuario
    const mockHistoryState = { state: { username: username } };
    spyOnProperty(window, 'history', 'get').and.returnValue({
      ...window.history,
      ...mockHistoryState,
    });

    // Vuelve a crear el componente después de simular el estado de la historia
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Verifica si el nombre de usuario en el componente es igual al que se simuló
    expect(component.username).toBe(username);
  });

  it('should not set username if no state', () => {
    // Vuelve a crear el componente sin simular un estado de historial
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Verifica si el nombre de usuario en el componente es una cadena vacía
    expect(component.username).toBe('');
  });
});
