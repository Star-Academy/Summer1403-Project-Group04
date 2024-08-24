import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumpComponent } from './bread-crump.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BreadCrumpComponent', () => {
  let component: BreadCrumpComponent;
  let fixture: ComponentFixture<BreadCrumpComponent>;
  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadCrumpComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadCrumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
