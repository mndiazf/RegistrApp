import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UnauthorizedPage } from './unauthorized.page';
import { AnimationController } from '@ionic/angular';

describe('UnauthorizedPage', () => {
  let component: UnauthorizedPage;
  let fixture: ComponentFixture<UnauthorizedPage>;
  let animationCtrlSpy: jasmine.SpyObj<AnimationController>;

  beforeEach(waitForAsync(() => {
    animationCtrlSpy = jasmine.createSpyObj('AnimationController', ['create']);

    TestBed.configureTestingModule({
      declarations: [UnauthorizedPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AnimationController, useValue: animationCtrlSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should stop audio on ngOnDestroy', () => {
    spyOn(component, 'stopAudio');

    component.ngOnDestroy();

    expect(component.stopAudio).toHaveBeenCalled();
  });


  it('should stop audio when stopAudio is called', () => {
    component.audio = new Audio();  // Simular la inicialización de audio
    spyOn(component.audio, 'pause');
    spyOn(component.stopAudio$, 'next');

    component.stopAudio();

    expect(component.audio.pause).toHaveBeenCalled();
    expect(component.audio.currentTime).toBe(0);
    expect(component.stopAudio$.next).toHaveBeenCalled();
  });
});
