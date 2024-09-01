import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../services/user/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserOutline } from '@ant-design/icons-angular/icons';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const mockUserService = {
    userData$: of({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      roles: ['user'],
    }),
  };

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [UserOutline],
        },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize userData from UserService WHEN navigated to profile page', () => {
    // Arrange

    // Act

    // Assert
    expect((component as any).userData).toEqual({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      roles: ['user'],
    });
  });

  it('SHOULD generate fake data on initialization WHEN navigated to profile page', () => {
    // Arrange

    // Act

    // Assert
    (component as any).generateFakeData();
    expect((component as any).fakeData.country).toBeTruthy();
    expect((component as any).fakeData.city).toBeTruthy();
    expect((component as any).fakeData.tel).toBeTruthy();
    expect((component as any).fakeData.address).toBeTruthy();
  });
});
