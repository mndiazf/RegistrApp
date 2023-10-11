import { TestBed } from '@angular/core/testing';

import { ServiciousuarioService } from './serviciousuario.service';

describe('ServiciousuarioService', () => {
  let service: ServiciousuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciousuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
