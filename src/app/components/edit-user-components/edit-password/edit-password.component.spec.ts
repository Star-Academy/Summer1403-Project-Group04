import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { KeyOutline, LockOutline } from '@ant-design/icons-angular/icons';
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
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        NzIconService,
        { provide: NZ_ICONS, useValue: [LockOutline, KeyOutline] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
