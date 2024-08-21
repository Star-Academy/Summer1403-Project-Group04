import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsComponent } from './layouts.component';
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



describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutsComponent],
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

    fixture = TestBed.createComponent(LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
