import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  NodeIndexOutline,
  TeamOutline,
  UserAddOutline,
  DotChartOutline,
} from '@ant-design/icons-angular/icons';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        NzIconService,
        provideHttpClient(),
        {
          provide: NZ_ICONS,
          useValue: [
            NodeIndexOutline,
            UserAddOutline,
            TeamOutline,
            DashboardOutline,
            DotChartOutline,
          ],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
