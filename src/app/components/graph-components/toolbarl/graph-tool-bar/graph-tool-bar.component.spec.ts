import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphToolBarComponent } from './graph-tool-bar.component';
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
  FilterOutline ,
  SettingOutline ,
  GithubOutline 
} from '@ant-design/icons-angular/icons';


describe('GraphToolBarComponent', () => {
  let component: GraphToolBarComponent;
  let fixture: ComponentFixture<GraphToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphToolBarComponent],
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
            FilterOutline ,
            SettingOutline ,
            GithubOutline 
          ],
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
