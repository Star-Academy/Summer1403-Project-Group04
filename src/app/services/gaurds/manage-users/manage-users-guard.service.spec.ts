import { TestBed } from '@angular/core/testing';

import { ManageUsersGuardService } from './manage-users-guard.service';

describe('ManageUsersGuardService', () => {
  let service: ManageUsersGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUsersGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
