import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { NgParticlesService } from '@tsparticles/angular';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let ngParticlesServiceMock: jasmine.SpyObj<NgParticlesService>;
  const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch']);

  beforeEach(async () => {
    ngParticlesServiceMock = jasmine.createSpyObj('NgParticlesService', ['init']);

    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [UserOutline, LockOutline],
        },
        { provide: NgParticlesService, useValue: ngParticlesServiceMock },
        { provide: HttpClient, useValue: httpSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD emit handleForm event WHEN Get Started button is clicked', () => {
    // Arrange
    spyOn(component.handleForm, 'emit');

    // Act
    const getStartedButton = fixture.debugElement.query(By.css('.hero__container__content__text__rows__row__login'));
    getStartedButton.triggerEventHandler('click', null);

    // Assert
    expect(component.handleForm.emit).toHaveBeenCalledWith(true);
  });

  it('SHOULD display login form WHEN showForm is true', () => {
    // Arrange
    component.showForm = true;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const loginForm = fixture.debugElement.query(By.css('app-login-form'));
    expect(loginForm).toBeTruthy();
  });

  it('SHOULD NOT display login form WHEN showForm is false', () => {
    // Arrange
    component.showForm = false;
    
    // Act
    fixture.detectChanges();

    // Assert
    const loginForm = fixture.debugElement.query(By.css('app-login-form'));
    expect(loginForm).toBeFalsy();
  });

  it('SHOULD apply hide-text class to text container WHEN showForm is true', () => {
    // Arrange
    component.showForm = true;

    // Act
    fixture.detectChanges();

    // Assert
    const textContainer = fixture.debugElement.query(By.css('.hero__container__content__text'));
    expect(textContainer.classes['hide-text']).toBeTrue();
  });

  it('SHOULD NOT apply hide-text class to text container WHEN showForm is false', () => {
    // Arrange
    component.showForm = false;

    // Act
    fixture.detectChanges();

    // Assert
    const textContainer = fixture.debugElement.query(By.css('.hero__container__content__text'));
    expect(textContainer.classes['hide-text']).toBeUndefined();
  });

  it('SHOULD apply slide-out class to image container WHEN showForm is true', () => {
    // Arrange
    component.showForm = true;

    // Act
    fixture.detectChanges();

    // Assert
    const imageContainer = fixture.debugElement.query(By.css('.hero__container__content__image-container'));
    expect(imageContainer.classes['slide-out']).toBeTrue();
  });

  it('SHOULD NOT apply slide-out class to image container WHEN showForm is false', () => {
    // Arrange
    component.showForm = false;

    // Act
    fixture.detectChanges();

    // Assert
    const imageContainer = fixture.debugElement.query(By.css('.hero__container__content__image-container'));
    expect(imageContainer.classes['slide-out']).toBeUndefined();
  });
});
