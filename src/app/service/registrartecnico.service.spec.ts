import { TestBed, inject } from '@angular/core/testing';

import { RegistrartecnicoService } from './registrartecnico.service';

describe('RegistrartecnicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrartecnicoService]
    });
  });

  it('should be created', inject([RegistrartecnicoService], (service: RegistrartecnicoService) => {
    expect(service).toBeTruthy();
  }));
});
