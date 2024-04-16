import { TestBed } from '@angular/core/testing';

import { AplicallService } from './aplicall.service';

describe('AplicallService', () => {
  let service: AplicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
