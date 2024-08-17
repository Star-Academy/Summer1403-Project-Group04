import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { DashboardOutline, NodeIndexOutline, TeamOutline, UserAddOutline } from '@ant-design/icons-angular/icons';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [NodeIndexOutline, UserAddOutline, TeamOutline, DashboardOutline],
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
