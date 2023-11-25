import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { Router } from '@angular/router';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        // Puedes añadir servicios necesarios aquí, si los tienes
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Obtener el router del TestBed
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when submitForm is called', () => {
    spyOn(router, 'navigate').and.stub(); // Espiar el método 'navigate' y no hacer nada

    component.submitForm();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
