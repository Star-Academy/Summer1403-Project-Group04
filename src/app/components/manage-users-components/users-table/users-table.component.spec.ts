import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { TeamOutline, UserAddOutline } from '@ant-design/icons-angular/icons';
import { provideHttpClient } from '@angular/common/http';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
      providers: [
        NzIconService,
        provideHttpClient(),
        {
          provide: NZ_ICONS,
          useValue: [UserAddOutline, TeamOutline]
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
