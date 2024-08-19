import { TestBed } from '@angular/core/testing';

import { DashboardGuardService } from './dashboard-guard.service';
import { provideHttpClient } from '@angular/common/http';

describe('DashboardGuardService', () => {
  let service: DashboardGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(DashboardGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
