import { TestBed } from '@angular/core/testing';
import { ManageUsersGuardService } from './manage-users-guard.service';
import { Router } from '@angular/router';
import { PermisionsService } from '../../permisisons/permisions.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageUsersGuardService', () => {
  let service: ManageUsersGuardService;
  let routerSpy: jasmine.SpyObj<Router>;
  let permissionServiceSpy: jasmine.SpyObj<PermisionsService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const permissionServiceMock = jasmine.createSpyObj('PermisionsService', ['getPermissions']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ManageUsersGuardService,
        { provide: Router, useValue: routerMock },
        { provide: PermisionsService, useValue: permissionServiceMock },
      ],
    });

    service = TestBed.inject(ManageUsersGuardService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    permissionServiceSpy = TestBed.inject(PermisionsService) as jasmine.SpyObj<PermisionsService>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD allow activation WHEN user has /api/Admin permission', () => {
    // Arrange
    permissionServiceSpy.getPermissions.and.returnValue(['/api/Admin', '/api/User']);

    // Act
    const result = service.canActivate();

    // Assert
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('SHOULD prevent activation and navigate to dashboard WHEN user lacks /api/Admin permission', () => {
    // Arrange
    permissionServiceSpy.getPermissions.and.returnValue(['/api/User']);

    // Act
    const result = service.canActivate();

    // Assert
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
