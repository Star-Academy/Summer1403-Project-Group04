import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { PermisionsService } from '../../permisisons/permisions.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let permissionServiceSpy: jasmine.SpyObj<PermisionsService>;

  beforeEach(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const permissionServiceMock = jasmine.createSpyObj('PermisionsService', ['setPermissions']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: PermisionsService, useValue: permissionServiceMock },
      ],
    });

    service = TestBed.inject(AuthGuardService);
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    permissionServiceSpy = TestBed.inject(PermisionsService) as jasmine.SpyObj<PermisionsService>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD allow activation and navigate to dashboard WHEN user has valid permissions', () => {
    // Arrange
    const permissions = JSON.stringify(['admin', 'user']);
    loginServiceSpy.isLoggedIn.and.returnValue(of({ permissions }));

    // Act
    service.canActivate();

    // Assert
    expect(permissionServiceSpy.setPermissions).toHaveBeenCalledWith(['admin', 'user']);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('SHOULD prevent activation and navigate to home WHEN user has invalid permissions', () => {
    // Arrange
    const permissions = 'invalid_permissions_format';
    loginServiceSpy.isLoggedIn.and.returnValue(of({ permissions }));

    // Act
    service.canActivate();

    // Assert
    expect(permissionServiceSpy.setPermissions).not.toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('SHOULD prevent activation and navigate to home WHEN isLoggedIn returns an error', () => {
    // Arrange
    loginServiceSpy.isLoggedIn.and.returnValue(throwError(() => new HttpErrorResponse({ error: 'Error' })));

    // Act
    service.canActivate();

    // Assert
    expect(permissionServiceSpy.setPermissions).not.toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
