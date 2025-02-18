import { TestBed } from '@angular/core/testing';

import { NotedefraisService } from './notedefrais.service';

describe('NotedefraisService', () => {
  let service: NotedefraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotedefraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
