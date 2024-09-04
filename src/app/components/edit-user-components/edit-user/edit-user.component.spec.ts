import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import {
  IdcardOutline,
  KeyOutline,
  LockOutline,
  MailOutline,
  MenuOutline,
  SettingOutline,
  TeamOutline,
  UsergroupAddOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { EditUserComponent } from './edit-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { PermisionsService } from '../../../services/permisisons/permisions.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { By } from '@angular/platform-browser';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  const mockUserData = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    roles: ['user'],
  };
  const mockUserService = {
    getUserById: jasmine.createSpy('getUserById').and.returnValue(Promise.resolve(mockUserData)),
    userData$: of(mockUserData),
    getRoles: jasmine.createSpy('getRoles').and.returnValue(of(['Admin', 'User'])),
  };
  const mockPermisionService = {
    permissions$: of(['/api/Admin', '/api/User']),
  };
  const mockActivatedRoute = {
    queryParams: of({}),
  };
  const mockRouter = {
    url: 'dashboard/',
    events: of({}),
    navigate: jasmine.createSpy('navigate'),
    createUrlTree: jasmine.createSpy('createUrlTree').and.callFake((commands) => commands),
    serializeUrl: jasmine.createSpy('serializeUrl').and.callFake((url) => url.toString()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserComponent],
      providers: [
        provideAnimationsAsync(),
        NzIconService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
        { provide: PermisionsService, useValue: mockPermisionService },
        {
          provide: NZ_ICONS,
          useValue: [
            MenuOutline,
            SettingOutline,
            LockOutline,
            KeyOutline,
            UserOutline,
            MailOutline,
            TeamOutline,
            IdcardOutline,
            UsergroupAddOutline,
          ],
        },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD load user data from ActivatedRoute query parameters WHEN id is provided in query params', fakeAsync(() => {
    // Arrange
    mockActivatedRoute.queryParams = of({ id: 1 });

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // Assert
    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
    expect((component as any).userData).toEqual(mockUserData);
  }));

  it('SHOULD load user data from userService userData$ observable WHEN id is not provided in query params', async () => {
    // Arrange
    mockActivatedRoute.queryParams = of({});

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect((component as any).userData).toEqual(mockUserData);
  });

  it('SHOULD load user permissions from PermisionsService WHEN ever', fakeAsync(() => {
    // Arrange
    mockPermisionService.permissions$ = of(['/api/Admin']);

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // Assert
    expect((component as any).userPermissions).toEqual(['/api/Admin']);
  }));

  it('SHOULD render <app-edit-role> WHEN user has Admin permissions', fakeAsync(() => {
    // Arrange
    mockPermisionService.permissions$ = of(['/api/Admin']);

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // Assert
    const editRoleComponent = fixture.nativeElement.querySelector('app-edit-role');
    expect(editRoleComponent).toBeTruthy();
  }));

  it('SHOULD NOT render <app-edit-role> WHEN user does not have Admin permissions', fakeAsync(() => {
    // Arrange
    mockPermisionService.permissions$ = of(['/api/User']);

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // Assert
    const editRoleComponent = fixture.nativeElement.querySelector('app-edit-role');
    expect(editRoleComponent).toBeFalsy();
  }));

  it('SHOULD pass correct userData to <app-edit-profile> WHEN ever', () => {
    // Arrange

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    const editProfileComponent = fixture.debugElement.query(By.css('app-edit-profile')).componentInstance;
    expect(editProfileComponent.userData).toEqual(mockUserData);
  });

  it('SHOULD pass correct userData to <app-edit-role> WHEN user has admin permissions', fakeAsync(() => {
    // Arrange
    mockPermisionService.permissions$ = of(['/api/Admin']);

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    // Assert
    const editRoleComponent = fixture.debugElement.query(By.css('app-edit-role')).componentInstance;
    expect(editRoleComponent.userData).toEqual(mockUserData);
  }));

  it('SHOULD render <app-bread-crump> WHEN ever', () => {
    const breadCrumpComponent = fixture.nativeElement.querySelector('app-bread-crump');
    expect(breadCrumpComponent).toBeTruthy();
  });
});
