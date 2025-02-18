import { TestBed } from '@angular/core/testing';

import { FraishorsforfaitService } from '../fraishorsforfait/fraishorsforfait.service';

describe('FraishorsforfaitService', () => {
  let service: FraishorsforfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraishorsforfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
