import { TestBed } from '@angular/core/testing';

import { CentreService } from './centre.service';

describe('CentreService', () => {
  let service: CentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
