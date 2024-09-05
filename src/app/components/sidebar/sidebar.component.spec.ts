import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  UserOutline,
  NodeIndexOutline,
  TeamOutline,
  DotChartOutline,
} from '@ant-design/icons-angular/icons';
import { of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user-data';
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { HttpClient } from '@angular/common/http';
import { DashboardGuardService } from '../../services/gaurds/dashboard-guard/dashboard-guard.service';
import { PermisionsService } from '../../services/permisisons/permisions.service';
import { ManageUsersGuardService } from '../../services/gaurds/manage-users/manage-users-guard.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockUserService: Partial<UserService>;
  let userDataSubject: BehaviorSubject<UserData>;
  let permissionsSubject: BehaviorSubject<string[]>;
  const manageUsersGuardSpy = jasmine.createSpyObj('ManageUsersGuardService', ['canActivate']);
  const dashboardGuardSpy = jasmine.createSpyObj('DashboardGuardService', ['canActivate']);

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };
  const initialUserData: UserData = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: ['admin'],
  };
  const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch']);

  beforeEach(async () => {
    userDataSubject = new BehaviorSubject<UserData>(initialUserData);
    dashboardGuardSpy.canActivate.and.returnValue(of(true));
    manageUsersGuardSpy.canActivate.and.returnValue(of(true));
    permissionsSubject = new BehaviorSubject<string[]>(['/api/Admin', '/api/User']);

    const mockPermissionsService = jasmine.createSpyObj(
      'PermisionsService',
      ['setPermissions', 'getPermissions', 'clearPermissions'],
      {
        permissions$: permissionsSubject.asObservable(),
      }
    );

    mockUserService = {
      userData$: userDataSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [NodeIndexOutline, TeamOutline, HomeOutline, UserOutline, DotChartOutline],
        },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClient, useValue: httpSpy },
        { provide: DashboardGuardService, useValue: dashboardGuardSpy },
        { provide: ManageUsersGuardService, useValue: manageUsersGuardSpy },
        { provide: PermisionsService, useValue: mockPermissionsService },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD display the user's initials WHEN navigated to dashboard or its children", () => {
    // Arrange
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const userNameElement = compiled.querySelector('.sidebar-logo__profile-container__name__text');

    // Act

    // Assert
    expect(userNameElement.textContent).toContain('J. Doe');
  });

  it('SHOULD handle changing userData WHEN user data is changed', () => {
    // Arrange
    const newUserData: UserData = {
      id: 2,
      username: 'newuser',
      email: 'new@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      roles: ['user'],
    };

    // Act
    userDataSubject.next(newUserData);
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const userNameElement = compiled.querySelector('.sidebar-logo__profile-container__name__text');

    expect(userNameElement.textContent).toContain('J. Smith');
  });

  it('SHOULD display manage users element based on admin permissions WHEN ever', () => {
    // Arrange
    (component as any).userPermissions = ['/api/Admin'];

    // Act
    fixture.detectChanges();

    // Assert
    const manageUsersMenuItem = fixture.nativeElement.querySelector('[nzTitle="Manage Users"]');
    expect(manageUsersMenuItem).toBeTruthy();
  });

  it('SHOULD not display manage users element based on user permissions WHEN ever', () => {
    // Arrange
    (component as any).userPermissions = [];

    // Act
    fixture.detectChanges();

    // Assert
    const hiddenManageUsersMenuItem = fixture.nativeElement.querySelector('[nzTitle="Manage Users"]');
    expect(hiddenManageUsersMenuItem).toBeNull();
  });

  it('SHOULD trigger logout WHEN logout button is clicked', () => {
    // Arrange
    spyOn(component as any, 'logout');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('.sidebar-logo__profile-container__name__icon');

    // Act
    logoutButton.dispatchEvent(new Event('click'));

    // Assert
    expect((component as any).logout).toHaveBeenCalled();
  });

  it('SHOULD navigate to dashboard WHEN logo on sidebar is clicked', fakeAsync(() => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('.sidebar-logo__title-container'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard');
  }));

  it("SHOULD navigate to profile WHEN user's name on sidebar is clicked", fakeAsync(() => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('.sidebar-logo__profile-container__name__text'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard/profile');
  }));

  it("SHOULD navigate to profile WHEN user's profile icon on sidebar is clicked", fakeAsync(() => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('.sidebar-logo__profile-container__image'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard/profile');
  }));

  it('SHOULD navigate to dashboard WHEN dashboard element on sidebar is clicked', fakeAsync(() => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('.menu-sidebar__list__item[nzTitle="Dashboard"]'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard');
  }));

  it('SHOULD navigate to manage users WHEN manage users element on sidebar is clicked with admin permissions', fakeAsync(() => {
    // Arrange
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('.menu-sidebar__list__item[nzTitle="Manage Users"]'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard/manage-users');
  }));

  it('SHOULD navigate to graph WHEN graph element on sidebar is clicked', fakeAsync(() => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('.menu-sidebar__list__item[nzTitle="Graph"]'));

    // Act
    debugElement.nativeElement.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    // Assert
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/dashboard/graph');
  }));
});
