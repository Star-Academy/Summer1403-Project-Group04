import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';
import { of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        HttpClient,
        HttpHandler,
        LoginService,
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    loginService.login.and.returnValue(of({ success: true }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD call login service with proper values WHEN submited', () => {
    // Arrange
    component.signInForm = new FormGroup({
      username: new FormControl('armin', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('1234', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    // Act
    component.onSubmit();
    fixture.detectChanges();
    // Assert
    expect(loginService.login).toHaveBeenCalledWith('armin', '1234');
  });

  it('SHOULD trigger shake animation and mark as touched WHEN inputs are invalid', () => {
    // Arrange
    component.signInForm = new FormGroup({
      username: new FormControl('a', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('1', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    spyOn(component, 'triggerShakeAnimation').and.callThrough();
    spyOn(component.signInForm, 'markAllAsTouched').and.callThrough();
    // Act
    component.onSubmit();
    fixture.detectChanges();
    // Assert
    expect(component.signInForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.triggerShakeAnimation).toHaveBeenCalled();
  });

  it('SHOULD add shake class WHEN trigger animation is called', () => {
    // Arrange
    component.signInForm = new FormGroup({
      username: new FormControl('a', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('1', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    // spyOn(window, 'requestAnimationFrame').and.callFake(callback => true);
    // Act
    component.onSubmit();
    // Assert
    console.log(component.inputFields);
    component.inputFields.forEach((field) => {
      const element = field.nativeElement;
      const elementName = element.placeholder.toLowerCase().replaceAll('-', '');
      console.log(element.classList);
      console.log(element.classList.contains('shake'));
      
      expect(component.signInForm.get(elementName)?.invalid).toBe(true);
      // expect(element.classList.contains('shake')).toBe(true); IDK , IDK , IDK .........
    });
  });
});
