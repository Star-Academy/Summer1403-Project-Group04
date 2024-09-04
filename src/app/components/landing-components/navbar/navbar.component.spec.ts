import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD emit handleForm event WHEN login button is clicked', () => {
    // Arrange
    spyOn(component.handleForm, 'emit');

    // Act
    const loginButton = fixture.debugElement.query(By.css('.header__navbar__container__collapse__cta__login'));
    loginButton.triggerEventHandler('click', null);

    // Assert
    expect(component.handleForm.emit).toHaveBeenCalledWith(true);
  });

  it('SHOULD display the navbar correctly', () => {
    // Arrange
    const compiled = fixture.debugElement.nativeElement;

    // Act

    // Assert
    expect(compiled.querySelector('.header__navbar__container__logo__title').textContent).toContain('Negar');
    expect(compiled.querySelectorAll('.header__navbar__container__collapse__menu__item').length).toBe(6);
  });

  it('SHOULD correctly show input form property WHEN EVER', () => {
    // Arrange
    component.showForm = true;
    
    // Act
    fixture.detectChanges();

    // Assert
    expect(component.showForm).toBeTrue();
  });

  it('SHOULD correctly hide input form property WHEN EVER', () => {
    // Arrange
    component.showForm = false;
    
    // Act
    fixture.detectChanges();

    // Assert
    expect(component.showForm).toBeFalse();
  });
});
