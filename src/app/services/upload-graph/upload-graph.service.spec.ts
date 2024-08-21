import { TestBed } from '@angular/core/testing';

import { UploadGraphService } from './upload-graph.service';

describe('UploadGraphService', () => {
  let service: UploadGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
