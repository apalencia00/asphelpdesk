import { TestBed, inject } from '@angular/core/testing';

import { PerfilOpcionService } from './perfil-opcion.service';

describe('PerfilOpcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilOpcionService]
    });
  });

  it('should be created', inject([PerfilOpcionService], (service: PerfilOpcionService) => {
    expect(service).toBeTruthy();
  }));
});
