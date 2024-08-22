import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  UserOutline,
  NodeIndexOutline,
  TeamOutline,
  DotChartOutline,
} from '@ant-design/icons-angular/icons';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideHttpClient(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [NodeIndexOutline, TeamOutline, HomeOutline, UserOutline, DotChartOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
