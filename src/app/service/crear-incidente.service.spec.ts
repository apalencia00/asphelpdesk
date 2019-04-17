import { TestBed, inject } from '@angular/core/testing';

import { CrearIncidenteService } from './crear-incidente.service';

describe('CrearIncidenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearIncidenteService]
    });
  });

  it('should be created', inject([CrearIncidenteService], (service: CrearIncidenteService) => {
    expect(service).toBeTruthy();
  }));
});
