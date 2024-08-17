import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { NodeIndexOutline } from '@ant-design/icons-angular/icons';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        HttpClient,
        HttpHandler,
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [NodeIndexOutline],
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD create page WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
