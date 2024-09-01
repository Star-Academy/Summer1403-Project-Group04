import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { MenuOutline, UserOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { DashboardNavbarComponent } from './dashboard-navbar.component';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';

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
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [MenuOutline, SettingOutline, UserOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD display user data correctly in the navbar WHEN EVER', () => {
    // Arrange
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const userNameElement = compiled.querySelector('.navbar__right__menu-button');
    
    // Act

    // Assert
    expect(userNameElement.textContent).toContain('J. Doe');
  });
});
