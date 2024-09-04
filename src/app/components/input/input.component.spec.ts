import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { EyeInvisibleOutline } from '@ant-design/icons-angular/icons';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      providers: [
        provideAnimationsAsync(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [EyeInvisibleOutline],
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD initialize with default values WHEN ever', () => {
    // Arrange

    // Act

    // Assert
    expect(component.type).toBe('text');
    expect(component.placeholder).toBe('');
    expect(component.prefixIcon).toBe('');
    expect(component.errorTip).toBe('');
    expect(component.options).toEqual([]);
    expect(component.listOfTagOptions).toEqual([]);
  });

  it('SHOULD handle value changes for text input WHEN any changes occur', () => {
    // Arrange
    const input = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    const newValue = 'new value';

    // Act
    input.value = newValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(input.value).toBe(newValue);
  });

  it('SHOULD toggle password visibility WHEN eye icon is clicked', () => {
    // Arrange
    component.type = 'password';
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    const toggleIcon = fixture.debugElement.query(By.css('.toggle-password-visibility')).nativeElement;

    // Act
    toggleIcon.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert
    expect(passwordInput.type).toBe('text');

    // Act
    toggleIcon.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert
    expect(passwordInput.type).toBe('password');
  });

  it('SHOULD emit tagChange event WHEN tag selection changes', () => {
    // Arrange
    spyOn(component.tagChange, 'emit');
    component.type = 'select';
    component.options = [{ label: 'Option 1', value: 'option1' }];
    component.listOfTagOptions = [];
    fixture.detectChanges();

    // Act
    component.listOfTagOptions = ['Option 1'];
    component.onTagChange(component.listOfTagOptions);
    fixture.detectChanges();

    // Assert
    expect(component.tagChange.emit).toHaveBeenCalledWith(['Option 1']);
  });

  it('SHOULD call onChange method WHEN input changes', () => {
    // Arrange
    spyOn(component, 'onChange');
    spyOn(component, 'onTouched');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    // Act
    input.value = 'new value';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.onChange).toHaveBeenCalledWith('new value');
  });

  it('SHOULD correctly update the control value WHEN input changes', () => {
    // Arrange

    // Act
    component.writeValue('test value');

    // Assert
    expect((component as any).value).toBe('test value');
  });
});
