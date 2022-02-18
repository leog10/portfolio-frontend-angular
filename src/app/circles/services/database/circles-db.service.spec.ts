import { TestBed } from '@angular/core/testing';

import { CirclesDbService } from './circles-db.service';

describe('CirclesDbService', () => {
  let service: CirclesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirclesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
