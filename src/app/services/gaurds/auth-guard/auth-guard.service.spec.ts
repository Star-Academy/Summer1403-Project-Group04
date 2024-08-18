import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
