import { TestBed } from '@angular/core/testing';
import { DashboardGuardService } from './dashboard-guard.service';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { PermisionsService } from '../../permisisons/permisions.service';
import { UserService } from '../../user/user.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DashboardGuardService', () => {
  let service: DashboardGuardService;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let permissionServiceSpy: jasmine.SpyObj<PermisionsService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const permissionServiceMock = jasmine.createSpyObj('PermisionsService', ['setPermissions']);
    const userServiceMock = jasmine.createSpyObj('UserService', ['getCurrentUser']);

    TestBed.configureTestingModule({
      providers: [
        DashboardGuardService,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: PermisionsService, useValue: permissionServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });

    service = TestBed.inject(DashboardGuardService);
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    permissionServiceSpy = TestBed.inject(PermisionsService) as jasmine.SpyObj<PermisionsService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD allow activation and call getCurrentUser WHEN user has valid permissions', (done) => {
    // Arrange
    const permissions = JSON.stringify(['admin', 'user']);
    loginServiceSpy.isLoggedIn.and.returnValue(of({ permissions }));

    // Act

    // Assert
    service.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      expect(permissionServiceSpy.setPermissions).toHaveBeenCalledWith(['admin', 'user']);
      expect(userServiceSpy.getCurrentUser).toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('SHOULD prevent activation and navigate to home WHEN user has invalid permissions', (done) => {
    // Arrange
    const permissions = 'invalid_permissions_format';
    loginServiceSpy.isLoggedIn.and.returnValue(of({ permissions }));

    // Act

    // Assert
    service.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(permissionServiceSpy.setPermissions).not.toHaveBeenCalled();
      expect(userServiceSpy.getCurrentUser).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('SHOULD prevent activation and navigate to home WHEN isLoggedIn returns an error', (done) => {
    // Arrange
    loginServiceSpy.isLoggedIn.and.returnValue(throwError(() => new HttpErrorResponse({ error: 'Error' })));

    // Act

    // Assert
    service.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(permissionServiceSpy.setPermissions).not.toHaveBeenCalled();
      expect(userServiceSpy.getCurrentUser).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
