import { TestBed } from '@angular/core/testing';

import { LigneFraisauforfaitService } from './lignefraisauforfait.service';

describe('FraisauforfaitService', () => {
  let service: LigneFraisauforfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneFraisauforfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
