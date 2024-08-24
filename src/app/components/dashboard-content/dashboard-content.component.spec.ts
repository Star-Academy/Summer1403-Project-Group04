import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { DashboardContentComponent } from './dashboard-content.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentOutline, DislikeOutline, LikeOutline } from '@ant-design/icons-angular/icons';

describe('DashboardContentComponent', () => {
  let component: DashboardContentComponent;
  let fixture: ComponentFixture<DashboardContentComponent>;
  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContentComponent],
      providers: [
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [CommentOutline, LikeOutline, DislikeOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
