import { TestBed, inject } from '@angular/core/testing';

import { DetalleIncidenciaService } from './detalle-incidencia.service';

describe('DetalleIncidenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleIncidenciaService]
    });
  });

  it('should be created', inject([DetalleIncidenciaService], (service: DetalleIncidenciaService) => {
    expect(service).toBeTruthy();
  }));
});
