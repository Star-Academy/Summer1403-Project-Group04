import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { of, Subject, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { IdcardOutline, MailOutline, TeamOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { UserService } from '../../../services/user/user.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserData } from '../../../models/user-data';
import { HttpErrorResponse } from '@angular/common/http';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let notificationServiceMock: jasmine.SpyObj<NotificationService>;
  let userDataSubject: Subject<UserData>;

  const mockActivatedRoute = {
    queryParams: of({ id: 1 }),
  };

  beforeEach(async () => {
    userDataSubject = new Subject();
    userServiceMock = jasmine.createSpyObj('UserService', ['updateUser'], {
      userData$: userDataSubject.asObservable(),
    });
    notificationServiceMock = jasmine.createSpyObj('NotificationService', ['createNotification']);

    await TestBed.configureTestingModule({
      imports: [EditProfileComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [UserOutline, TeamOutline, MailOutline, IdcardOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: userServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;

    userDataSubject.next({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      roles: ['Admin'],
    });

    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize the form with default values WHEN ever', () => {
    // Arrange

    // Act

    // Assert
    expect((component as any).userForm).toBeDefined();
    expect((component as any).userForm.controls['firstName'].value).toEqual('');
    expect((component as any).userForm.controls['lastName'].value).toEqual('');
    expect((component as any).userForm.controls['email'].value).toEqual('');
    expect((component as any).userForm.controls['username'].value).toEqual('');
  });

  it('SHOULD update form controls WHEN userData is set', () => {
    // Arrange
    (component as any).userData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    };

    // Act
    component.ngOnChanges();

    // Assert
    expect((component as any).userForm.controls['firstName'].value).toEqual('John');
    expect((component as any).userForm.controls['lastName'].value).toEqual('Doe');
    expect((component as any).userForm.controls['email'].value).toEqual('john.doe@example.com');
    expect((component as any).userForm.controls['username'].value).toEqual('johndoe');
  });

  it('SHOULD mark firstName as invalid WHEN first name input is empty', () => {
    // Arrange
    const firstNameControl = (component as any).userForm.controls['firstName'];

    // Act
    firstNameControl.setValue('');

    // Assert
    expect(firstNameControl.invalid).toBeTruthy();
    expect(firstNameControl.errors?.['required']).toBeTruthy();
  });

  it('SHOULD mark firstName as valid WHEN first name input is not empty', () => {
    // Arrange
    const firstNameControl = (component as any).userForm.controls['firstName'];

    // Act
    firstNameControl.setValue('John');

    // Assert
    expect(firstNameControl.valid).toBeTruthy();
  });

  it('SHOULD mark lastName as invalid WHEN last name input is empty', () => {
    // Arrange
    const lastNameControl = (component as any).userForm.controls['lastName'];

    // Act
    lastNameControl.setValue('');

    // Assert
    expect(lastNameControl.invalid).toBeTruthy();
    expect(lastNameControl.errors?.['required']).toBeTruthy();
  });

  it('SHOULD mark lastName as valid WHEN last name input is not empty', () => {
    // Arrange
    const lastNameControl = (component as any).userForm.controls['lastName'];

    // Act
    lastNameControl.setValue('Doe');

    // Assert
    expect(lastNameControl.valid).toBeTruthy();
  });

  it('SHOULD mark email as invalid WHEN email input is empty', () => {
    // Arrange
    const emailControl = (component as any).userForm.controls['email'];

    // Act
    emailControl.setValue('');

    // Assert
    expect(emailControl.invalid).toBeTruthy();
    expect(emailControl.errors?.['required']).toBeTruthy();
  });

  it('SHOULD mark email as invalid WHEN email input is not an email', () => {
    // Arrange
    const emailControl = (component as any).userForm.controls['email'];

    // Act
    emailControl.setValue('john.doe');

    // Assert
    expect(emailControl.invalid).toBeTruthy();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });

  it('SHOULD mark email as valid WHEN email input is an email', () => {
    // Arrange
    const emailControl = (component as any).userForm.controls['email'];

    // Act
    emailControl.setValue('a@gmail.com');

    // Assert
    expect(emailControl.valid).toBeTruthy();
  });

  it('SHOULD mark username as invalid IF empty', () => {
    // Arrange
    const usernameControl = (component as any).userForm.controls['username'];

    // Act
    usernameControl.setValue('');

    // Assert
    expect(usernameControl.invalid).toBeTruthy();
    expect(usernameControl.errors?.['required']).toBeTruthy();
  });

  it('SHOULD mark username as invalid IF less than 3 characters', () => {
    // Arrange
    const usernameControl = (component as any).userForm.controls['username'];

    // Act
    usernameControl.setValue('ab');

    // Assert
    expect(usernameControl.invalid).toBeTruthy();
    expect(usernameControl.errors?.['minlength']).toBeTruthy();
  });

  it('SHOULD mark username as valid IF more than 3 characters', () => {
    // Arrange
    const usernameControl = (component as any).userForm.controls['username'];

    // Act
    usernameControl.setValue('abcd');

    // Assert
    expect(usernameControl.valid).toBeTruthy();
  });

  it('SHOULD submit the form WHEN form is valid upon submition', () => {
    // Arrange
    (component as any).userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    });
    (component as any).userData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'temp@gmail.com',
      username: 'johndoe',
    };
    userServiceMock.updateUser.and.returnValue(of({ message: 'Success' }));

    // Act
    component.onSubmit();

    // Assert
    expect(userServiceMock.updateUser).toHaveBeenCalled();
  });

  it('SHOULD not submit the form WHEN form invalid upon submition', () => {
    // Arrange
    (component as any).userData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'temp@gmail.com',
      username: 'johndoe',
    };

    // Act
    component.onSubmit();

    // Assert
    expect(userServiceMock.updateUser).not.toHaveBeenCalled();
  });

  it('SHOULD handle errors correctly WHEN updateUser returns a 400 error', () => {
    // Arrange
    (component as any).userData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'temp@gmail.com',
      username: 'johndoe',
    };
    (component as any).userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    });
  
    const errorResponse = new HttpErrorResponse({ status: 400 });
    userServiceMock.updateUser.and.returnValue(throwError(() => errorResponse));
  
    // Act
    component.onSubmit();
  
    // Assert
    expect(notificationServiceMock.createNotification).toHaveBeenCalledWith(
      'error',
      'Unexpected Error',
      'Bad Request: Please check your inputs'
    );
  });
});
