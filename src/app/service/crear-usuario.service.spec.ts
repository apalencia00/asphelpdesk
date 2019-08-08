import { TestBed, inject } from '@angular/core/testing';

import { CrearUsuarioService } from './crear-usuario.service';

describe('CrearUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearUsuarioService]
    });
  });

  it('should be created', inject([CrearUsuarioService], (service: CrearUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
