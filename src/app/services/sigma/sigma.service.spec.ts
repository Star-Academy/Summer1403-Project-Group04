import { TestBed } from '@angular/core/testing';

import { SigmaService } from './sigma.service';

describe('SigmaService', () => {
  let service: SigmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
