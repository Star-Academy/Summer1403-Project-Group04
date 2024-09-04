import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { EditRoleComponent } from './edit-role.component';
import { UserService } from '../../../services/user/user.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { DotChartOutline, UsergroupAddOutline } from '@ant-design/icons-angular/icons';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserData } from '../../../models/user-data';
import { HttpErrorResponse } from '@angular/common/http';

describe('EditRoleComponent', () => {
  let component: EditRoleComponent;
  let fixture: ComponentFixture<EditRoleComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let userDataSubject: Subject<UserData>;

  beforeEach(async () => {
    userDataSubject = new Subject<UserData>();

    const userServiceSpy = jasmine.createSpyObj('UserService', ['getRoles', 'updateRole', 'logout'], {
      userData$: userDataSubject.asObservable(),
    });
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['createNotification']);

    await TestBed.configureTestingModule({
      imports: [EditRoleComponent],
      providers: [
        provideAnimationsAsync(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [DotChartOutline, UsergroupAddOutline],
        },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditRoleComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    userDataSubject.next({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      roles: ['Admin'],
    });
    userService.getRoles.and.returnValue(of(['Admin', 'User']));
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize form with roles field WHEN ever', () => {
    // Arrange

    // Act

    // Assert
    expect((component as any).roleForm.contains('roles')).toBeTruthy();
    expect((component as any).roleForm.get('roles')?.valid).toBeFalsy();
  });

  it('SHOULD fetch and populate roles options on init WHEN ever', () => {
    // Arrange

    // Act

    // Assert
    expect(userService.getRoles).toHaveBeenCalled();
    expect((component as any).formControls[0].options.length).toBeGreaterThan(0);
    expect((component as any).formControls[0].options).toEqual([
      { label: 'Admin', value: 'Admin' },
      { label: 'User', value: 'User' },
    ]);
  });

  it('SHOULD update form values WHEN userData changes', () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'smith@gmail.com',
      roles: ['admin'],
    };
    component.userData = mockUserData;

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    // Assert
    expect((component as any).roleForm.get('roles')?.value).toEqual(mockUserData.roles);
  });

  it('SHOULD display error message if form is invalid WHEN submitted', () => {
    // Arrange
    spyOn((component as any).roleForm, 'markAllAsTouched');

    // Act
    (component as any).onSubmit();

    // Assert
    expect((component as any).isSubmitted).toBeTruthy();
    expect((component as any).roleForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('SHOULD call updateRole service and handle success response WHEN submitted', () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'smith@gmail.com',
      roles: ['admin'],
    };
    component.userData = mockUserData;
    component.ngOnChanges();
    fixture.detectChanges();

    const responseMock = { message: 'Role updated successfully' };
    userService.updateRole.and.returnValue(of(responseMock));

    // Act
    (component as any).roleForm.get('roles')?.setValue(['admin']);
    (component as any).onSubmit();

    // Assert
    expect(userService.updateRole).toHaveBeenCalledWith(['admin'], 1);
    expect(notificationService.createNotification).toHaveBeenCalledWith(
      'success',
      'Success',
      'Role updated successfully'
    );
  });

  it('SHOULD handle error response on updateRole service WHEN submitted', () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'smith@gmail.com',
      roles: ['admin'],
    };
    component.userData = mockUserData;
    component.ngOnChanges();
    fixture.detectChanges();
    const errorResponse = new HttpErrorResponse({
      error: 'Bad Request',
      status: 400,
    });
    userService.updateRole.and.returnValue(throwError(() => errorResponse));

    // Act
    (component as any).roleForm.get('roles')?.setValue(['admin']);
    (component as any).onSubmit();

    // Assert
    expect(userService.updateRole).toHaveBeenCalledWith(['admin'], 1);
    expect(notificationService.createNotification).toHaveBeenCalledWith(
      'error',
      'Unexpected Error',
      'Bad Request: Please check your input'
    );
  });

  it('SHOULD trigger logout if updated user is the logged-in user WHEN submitted and role updated successfully', () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith',
      email: 'smith@gmail.com',
      roles: ['Admin'],
    };
    component.userData = mockUserData;
    component.ngOnChanges();
    fixture.detectChanges();

    const responseMock = { message: 'Role updated successfully' };
    userService.updateRole.and.returnValue(of(responseMock));
    spyOn(component as any, 'logout');

    // Act
    (component as any).roleForm.get('roles')?.setValue(['Admin', 'User']);
    (component as any).onSubmit();

    userDataSubject.next({ id: 1, roles: ['Admin', 'User'] } as UserData);

    // Assert
    expect((component as any).logout).toHaveBeenCalled();
  });
});
