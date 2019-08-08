import { TestBed, inject } from '@angular/core/testing';

import { CrearPuntoventaService } from './crear-puntoventa.service';

describe('CrearPuntoventaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearPuntoventaService]
    });
  });

  it('should be created', inject([CrearPuntoventaService], (service: CrearPuntoventaService) => {
    expect(service).toBeTruthy();
  }));
});
