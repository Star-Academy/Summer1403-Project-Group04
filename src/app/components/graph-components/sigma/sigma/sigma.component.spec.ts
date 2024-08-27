import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigmaComponent } from './sigma.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { CloudDownloadOutline, FilterOutline, FullscreenOutline, ImportOutline, SettingOutline } from '@ant-design/icons-angular/icons';

describe('SigmaComponent', () => {
  let component: SigmaComponent;
  let fixture: ComponentFixture<SigmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigmaComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [FullscreenOutline,ImportOutline , FilterOutline , SettingOutline,CloudDownloadOutline],
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
