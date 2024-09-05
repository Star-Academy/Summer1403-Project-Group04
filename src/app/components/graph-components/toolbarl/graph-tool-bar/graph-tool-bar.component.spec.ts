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
  FilterOutline,
  SettingOutline,
  GithubOutline,
  CloudDownloadOutline,
  MenuOutline,
} from '@ant-design/icons-angular/icons';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('GraphToolBarComponent', () => {
  let component: GraphToolBarComponent;
  let fixture: ComponentFixture<GraphToolBarComponent>;

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

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
            FilterOutline,
            SettingOutline,
            GithubOutline,
            CloudDownloadOutline,
            MenuOutline
          ],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
