import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoautorizadoPage } from './noautorizado.page';

describe('NoautorizadoPage', () => {
  let component: NoautorizadoPage;
  let fixture: ComponentFixture<NoautorizadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoautorizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
