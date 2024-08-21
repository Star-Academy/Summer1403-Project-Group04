import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordComponent } from './edit-password.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('EditPasswordComponent', () => {
  let component: EditPasswordComponent;
  let fixture: ComponentFixture<EditPasswordComponent>;
  const mockActivatedRoute = {
    queryParams: of({ id: 1 }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPasswordComponent],
      providers: [provideHttpClient(), { provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
