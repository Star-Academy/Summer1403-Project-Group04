import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  HomeOutline,
  UserOutline,
  NodeIndexOutline,
  TeamOutline,
  UserAddOutline,
  DotChartOutline,
  MenuOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';
import { of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user-data';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUserService: Partial<UserService>;
  let userDataSubject: BehaviorSubject<UserData>;

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: { params: { id: 1 } },
  };

  const initialUserData: UserData = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: ['admin'],
  };

  beforeEach(async () => {
    userDataSubject = new BehaviorSubject<UserData>(initialUserData);
    mockUserService = {
      userData$: userDataSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: NZ_ICONS,
          useValue: [
            NodeIndexOutline,
            UserAddOutline,
            TeamOutline,
            HomeOutline,
            UserOutline,
            DotChartOutline,
            MenuOutline,
            SettingOutline,
          ],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
