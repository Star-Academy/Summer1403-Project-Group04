import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginFormComponent } from './login-form.component';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { APIResponse } from '../../../models/api-response';
import { HttpErrorResponse } from '@angular/common/http';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginServiceMock: jasmine.SpyObj<LoginService>;
  let routerMock: jasmine.SpyObj<Router>;
  let notificationServiceMock: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    loginServiceMock = jasmine.createSpyObj('LoginService', ['login']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    notificationServiceMock = jasmine.createSpyObj('NotificationService', ['createNotification']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [LockOutline, UserOutline],
        },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize the login form with empty values and required validators WHEN ever', () => {
    // Arrange
    const loginForm = (component as any).loginForm;

    // Act

    // Assert
    expect(loginForm).toBeTruthy();
    expect(loginForm.get('username')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
    expect(loginForm.get('username')?.hasError('required')).toBeTruthy();
    expect(loginForm.get('password')?.hasError('required')).toBeTruthy();
  });

  it('SHOULD mark form controls as dirty and invalid WHEN form is submitted with empty fields', () => {
    // Arrange
    spyOn((component as any).loginForm, 'markAsDirty').and.callThrough();

    // Act
    component.onSubmit();

    // Assert
    expect((component as any).loginForm.markAsDirty).toHaveBeenCalled();
    expect((component as any).loginForm.get('username')?.invalid).toBeTrue();
    expect((component as any).loginForm.get('password')?.invalid).toBeTrue();
  });

  it('SHOULD call login service and navigate to dashboard WHEN successfully loggedin', () => {
    // Arrange
    const response: APIResponse = { message: 'Login successful' };
    loginServiceMock.login.and.returnValue(of(response));
    (component as any).loginForm.setValue({ username: 'testuser', password: 'password' });

    // Act
    component.onSubmit();

    // Assert
    expect(loginServiceMock.login).toHaveBeenCalledWith('testuser', 'password');
    expect(notificationServiceMock.createNotification).toHaveBeenCalledWith(
      'success',
      'Successful Login',
      response.message
    );
    setTimeout(() => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
    }, 2000);
  });

  it('SHOULD handle login failure with 401 Unauthorized', () => {
    // Arrange
    const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    loginServiceMock.login.and.returnValue(throwError(() => errorResponse));
    (component as any).loginForm.setValue({ username: 'testuser', password: 'wrongpassword' });

    // Act
    component.onSubmit();

    // Assert
    expect(loginServiceMock.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    expect(notificationServiceMock.createNotification).toHaveBeenCalledWith(
      'error',
      'Login Failed',
      'Unauthorized: Invalid username or password'
    );
    setTimeout(() => {
      expect(routerMock.navigate).not.toHaveBeenCalled();
    }, 2000);
  });

  it('SHOULD handle login failure with 400 Bad Request', () => {
    // Arrange
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    loginServiceMock.login.and.returnValue(throwError(() => errorResponse));
    (component as any).loginForm.setValue({ username: 'testuser', password: 'wrongpassword' });

    // Act
    component.onSubmit();

    // Assert
    expect(loginServiceMock.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    expect(notificationServiceMock.createNotification).toHaveBeenCalledWith(
      'error',
      'Login Failed',
      'Bad Request: Please check your input'
    );
    setTimeout(() => {
      expect(routerMock.navigate).not.toHaveBeenCalled();
    }, 2000);
  });

  it('SHOULD reset onWait flag after login attempt (success or failure)', () => {
    // Arrange
    const response: APIResponse = { message: 'Login successful' };
    loginServiceMock.login.and.returnValue(of(response));
    (component as any).loginForm.setValue({ username: 'testuser', password: 'password' });

    // Act
    component.onSubmit();

    // Assert
    expect((component as any).onWait).toBeFalse();
  });
});
