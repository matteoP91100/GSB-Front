import { TestBed } from '@angular/core/testing';

import { FraisforfaitService } from './fraisforfait.service';

describe('FraisforfaitService', () => {
  let service: FraisforfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraisforfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
