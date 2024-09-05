import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { MenuOutline, UserOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { DashboardNavbarComponent } from './dashboard-navbar.component';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '../../app.routes';
import { HttpClient } from '@angular/common/http';
import { DashboardGuardService } from '../../services/gaurds/dashboard-guard/dashboard-guard.service';

describe('DashboardNavbarComponent', () => {
  let component: DashboardNavbarComponent;
  let fixture: ComponentFixture<DashboardNavbarComponent>;
  let mockUserService: Partial<UserService>;
  let userDataSubject: BehaviorSubject<UserData>;
  let mockNotificationService: Partial<NotificationService>;

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

    mockUserService = {
      userData$: userDataSubject.asObservable(),
    };

    mockNotificationService = {
      createNotification: jasmine.createSpy('createNotification'),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardNavbarComponent],
      providers: [
        provideAnimationsAsync(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [MenuOutline, SettingOutline, UserOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService },
        {
          provide: DashboardGuardService,
          useValue: { canActivate: () => of(true) },
        },
        { provide: HttpClient, useValue: httpSpy },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD display user data correctly in the navbar WHEN ever', () => {
    // Arrange
    const compiled = fixture.nativeElement;
    const userNameElement = compiled.querySelector('.navbar__right__menu-button');

    // Act

    // Assert
    expect(userNameElement.textContent).toContain('J. Doe');
  });

  it('SHOULD display user data correctly in the navbar dropdown WHEN dropdown button clicked', async () => {
    // Arrange
    const dropdownButton = fixture.nativeElement.querySelector('.navbar__right__menu-button');

    // Act
    dropdownButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    const userNameElement = window.document.querySelector('.navbar__right__custom-menu__header');
    expect(userNameElement?.textContent).toContain(' John Doe ');
  });

  it('SHOULD trigger logout WHEN logout button is clicked in the dropdown', async () => {
    // Arrange
    spyOn(component as any, 'logout');
    fixture.detectChanges();
    const dropdownButton = fixture.nativeElement.querySelector('.navbar__right__menu-button');

    // Act
    dropdownButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const logoutButton = window.document.querySelector('.navbar__right__custom-menu__list__item-logout');
    logoutButton?.dispatchEvent(new Event('click'));

    // Assert
    expect((component as any).logout).toHaveBeenCalled();
  });
});
