import { TestBed } from '@angular/core/testing';

import { MockBackService } from './mock-back.service';

describe('MockBackService', () => {
  let service: MockBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBackService);
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });
});
