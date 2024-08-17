import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { DashboardOutline, NodeIndexOutline, TeamOutline } from '@ant-design/icons-angular/icons';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [NodeIndexOutline, TeamOutline, DashboardOutline]
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
