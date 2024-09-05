import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { TeamOutline, UserAddOutline } from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  const mockUserService = {
    getRoles: () => of(['Admin', 'User']),
    addUser: jasmine.createSpy('addUser').and.returnValue(of({ message: 'User Created Successfully' })),
    getUsers: () =>
      of({
        users: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'temp@gmail.com',
            roles: ['Admin'],
            username: 'john_doe',
          },
        ],
        allUserCount: 1,
      }),
  };

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch']);

    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
      providers: [
        provideAnimationsAsync(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [UserAddOutline, TeamOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClient, useValue: httpSpy },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD update listOfData and total WHEN loadDataFromServer is called with valid parameters', () => {
    // Arrange
    const mockUsers = {
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          roles: ['Admin'],
          username: 'john_doe',
        },
      ],
      allUserCount: 1,
    };
    spyOn(component['userService'], 'getUsers').and.returnValue(of(mockUsers));

    // Act
    component['loadDataFromServer'](0, 10);
    fixture.detectChanges();

    // Assert
    expect((component as any).listOfData).toEqual(mockUsers.users);
    expect((component as any).total).toBe(mockUsers.allUserCount);
    expect((component as any).isLoading).toBeFalse();
  });
});
