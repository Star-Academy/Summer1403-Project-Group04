import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user-data';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockUserService: Partial<UserService>;
  let userDataSubject: BehaviorSubject<UserData>;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD display the user\'s initials WHEN navigated to dashboard or its children', () => {
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
});
