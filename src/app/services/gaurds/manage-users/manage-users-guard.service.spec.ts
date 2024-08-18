import { TestBed } from '@angular/core/testing';

import { ManageUsersGuardService } from './manage-users-guard.service';
import { provideHttpClient } from '@angular/common/http';

describe('ManageUsersGuardService', () => {
  let service: ManageUsersGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ManageUsersGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
