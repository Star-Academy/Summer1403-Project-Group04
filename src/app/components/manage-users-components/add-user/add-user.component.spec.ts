import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../../../services/user/user.service';
import { userRoles } from '../../../models/role-select';
import { NotificationService } from '../../../services/notification/notification.service';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  const mockUserService = {
    getRoles: () => of(['Admin', 'User']),
    addUser: jasmine.createSpy('addUser').and.returnValue(of({ message: 'User Created Successfully' })),
  };

  const mockNotificationService = {
    createNotification: jasmine.createSpy('createNotification'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD create the AddUserComponent WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD update form controls with roles from UserService WHEN component is called', () => {
    // Arrange
    const expectedRoles: userRoles[] = [
      { label: 'Admin', value: 'Admin' },
      { label: 'User', value: 'User' },
    ];

    // Act
    fixture.detectChanges();

    // Assert
    expect(component['formControls'].find((control) => control.name === 'roles')?.options).toEqual(expectedRoles);
  });

  it('SHOULD handle form submission and notify user WHEN submission is done successfully', () => {
    // Arrange
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      roles: 'Admin',
      username: 'john_doe',
      password: 'Password123!',
    });

    // Act
    component['onSubmitModal']();
    fixture.detectChanges();

    // Assert
    expect(mockNotificationService.createNotification).toHaveBeenCalledWith(
      'success',
      'User Created Successfully',
      'User Created Successfully'
    );
  });
});
