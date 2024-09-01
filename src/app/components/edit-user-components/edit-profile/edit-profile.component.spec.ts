import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NZ_ICONS, NzIconService } from 'ng-zorro-antd/icon';
import { IdcardOutline, MailOutline, TeamOutline, UserOutline } from '@ant-design/icons-angular/icons';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  const mockActivatedRoute = {
    queryParams: of({ id: 1 }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        NzIconService,
        {
          provide: NZ_ICONS,
          useValue: [UserOutline, TeamOutline, MailOutline, IdcardOutline],
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
