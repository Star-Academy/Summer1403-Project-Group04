import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { By } from '@angular/platform-browser';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD create page WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render form WHEN created', () => {
    // Arrange
    const form = fixture.debugElement.query(By.css('[data-testid="auth-form"]'))
    // Act
    fixture.detectChanges();
    // Assert
    expect(form).toBeTruthy();
  });
});
