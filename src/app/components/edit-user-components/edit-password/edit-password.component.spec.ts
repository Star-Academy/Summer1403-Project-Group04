import { NotificationService } from '../../../services/notification/notification.service';
import { KeyOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../../services/user/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditPasswordComponent } from './edit-password.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('EditPasswordComponent', () => {
  let component: EditPasswordComponent;
  let fixture: ComponentFixture<EditPasswordComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockActivatedRoute = {
    queryParams: of({}),
  };

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['updatePassword']);
    notificationService = jasmine.createSpyObj('NotificationService', ['createNotification']);

    await TestBed.configureTestingModule({
      imports: [EditPasswordComponent, ReactiveFormsModule, FormsModule, NzModalModule],
      providers: [
        NzIconService,
        { provide: NZ_ICONS, useValue: [LockOutline, KeyOutline] },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: userService },
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize the form with correct default values WHEN ever', () => {
    // Arrange
    const passwordForm = (component as any).passwordForm;

    // Act

    // Assert
    expect(passwordForm).toBeDefined();
    expect(passwordForm.get('oldpassword')?.value).toBe('');
    expect(passwordForm.get('newpassword')?.value).toBe('');
    expect(passwordForm.get('confirmPassword')?.value).toBe('');
  });

  it('SHOULD validate the new password with specific rules WHEN ever', () => {
    // Arrange
    const newPasswordControl = (component as any).passwordForm.get('newpassword');

    // Act
    newPasswordControl?.setValue('Short1!');

    // Assert
    expect(newPasswordControl?.valid).toBeFalse();

    // Act
    newPasswordControl?.setValue('ValidPassword1!');

    // Assert
    expect(newPasswordControl?.valid).toBeTrue();
  });

  it('SHOULD update password validation indicators WHEN new password changes', () => {
    // Arrange
    const newPasswordControl = (component as any).passwordForm.get('newpassword');

    // Act
    newPasswordControl?.setValue('Test1!');

    // Assert
    expect((component as any).passwordValidation.hasDigit).toBeTrue();
    expect((component as any).passwordValidation.hasLowercase).toBeTrue();
    expect((component as any).passwordValidation.hasUppercase).toBeTrue();
    expect((component as any).passwordValidation.hasSpecialChar).toBeTrue();
    expect((component as any).passwordValidation.hasValidLength).toBeFalse();
  });

  it('SHOULD validate password confirmation WHEN confirm password input changes', () => {
    // Arrange
    const passwordForm = (component as any).passwordForm;

    // Act
    passwordForm.get('newpassword')?.setValue('ValidPassword1!');
    passwordForm.get('confirmPassword')?.setValue('DifferentPassword1!');

    // Assert
    expect(passwordForm.get('confirmPassword')?.valid).toBeFalse();
    passwordForm.get('confirmPassword')?.setValue('ValidPassword1!');
    expect(passwordForm.get('confirmPassword')?.valid).toBeTrue();
  });

  it('SHOULD call userService.updatePassword for updating profile password WHEN isUpdatingProfile is true', () => {
    // Arrange
    (component as any).isUpdatingProfile = true;
    userService.updatePassword.and.returnValue(of({ message: 'Success' }));

    // Act
    (component as any).passwordForm.setValue({
      oldpassword: 'OldPassword1!',
      newpassword: 'NewPassword1!',
      confirmPassword: 'NewPassword1!',
    });

    (component as any).onSubmit();

    // Assert
    expect(userService.updatePassword).toHaveBeenCalledWith(null, (component as any).passwordForm, true);
    expect(notificationService.createNotification).toHaveBeenCalledWith('success', 'Success', 'Success');
  });

  it("SHOULD call userService.updatePassword for updating another user's password WHEN isUpdatingProfile is false", () => {
    // Arrange
    (component as any).isUpdatingProfile = false;
    (component as any).userID = 1;
    userService.updatePassword.and.returnValue(of({ message: 'Success' }));

    // Act
    (component as any).passwordForm.setValue({
      oldpassword: 'OldPassword1!',
      newpassword: 'NewPassword1!',
      confirmPassword: 'NewPassword1!',
    });

    (component as any).onSubmit();

    // Assert
    expect(userService.updatePassword).toHaveBeenCalledWith(1, (component as any).passwordForm, false);
    expect(notificationService.createNotification).toHaveBeenCalledWith('success', 'Success', 'Success');
  });

  it('SHOULD display error notification WHEN update fails', () => {
    // Arrange
    userService.updatePassword.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 400, statusText: 'Bad Request' }))
    );

    // Act
    (component as any).passwordForm.setValue({
      oldpassword: 'OldPassword1!',
      newpassword: 'NewPassword1!',
      confirmPassword: 'NewPassword1!',
    });

    (component as any).onSubmit();

    // Assert
    expect(notificationService.createNotification).toHaveBeenCalledWith(
      'error',
      'Unexpected Error',
      'Bad Request: Old password is wrong!'
    );
  });

  it('SHOULD mark all fields as touched WHEN form is invalid and submitted', () => {
    // Arrange

    // Act
    (component as any).passwordForm.setValue({
      oldpassword: '',
      newpassword: '',
      confirmPassword: '',
    });

    (component as any).onSubmit();

    // Assert
    expect((component as any).passwordForm.get('oldpassword')?.touched).toBeTrue();
    expect((component as any).passwordForm.get('newpassword')?.touched).toBeTrue();
    expect((component as any).passwordForm.get('confirmPassword')?.touched).toBeTrue();
  });

  it('SHOULD set isUpdatingProfile to false WHEN userID is present in URL params', () => {
    // Arrange
    mockActivatedRoute.queryParams = of({ id: 1 });

    // Act
    (component as any).ngOnInit();

    // Assert
    expect((component as any).isUpdatingProfile).toBeFalse();
  });

  it('SHOULD set isUpdatingProfile to true WHEN userID is NOT present in URL params', () => {
    // Arrange
    mockActivatedRoute.queryParams = of({});

    // Act
    (component as any).ngOnInit();

    // Assert
    expect((component as any).isUpdatingProfile).toBeTrue();
  });
});
