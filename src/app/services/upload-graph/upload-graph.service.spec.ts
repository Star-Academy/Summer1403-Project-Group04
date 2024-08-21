import { TestBed } from '@angular/core/testing';

import { UploadGraphService } from './upload-graph.service';
import { provideHttpClient } from '@angular/common/http';

describe('UploadGraphService', () => {
  let service: UploadGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(UploadGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
