import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { MenuOutline, UserOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { DashboardNavbarComponent } from './dashboard-navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('DashboardNavbarComponent', () => {
  let component: DashboardNavbarComponent;
  let fixture: ComponentFixture<DashboardNavbarComponent>;

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavbarComponent],
      providers: [
        provideHttpClient(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [MenuOutline, SettingOutline, UserOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
