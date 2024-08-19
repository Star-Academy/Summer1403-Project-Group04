import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelComponent } from './right-panel.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import {
  ProjectOutline,
  NodeIndexOutline,
  PlusOutline,
  ImportOutline,
  RadarChartOutline,
  SyncOutline,
  UserOutline,
  FullscreenOutline,
} from '@ant-design/icons-angular/icons';



describe('RightPanelComponent', () => {
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightPanelComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [
            NodeIndexOutline,
            ProjectOutline,
            PlusOutline,
            ImportOutline,
            RadarChartOutline,
            SyncOutline,
            UserOutline,
            FullscreenOutline,
          ],
        },
      ],
      
    }).compileComponents();

    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
