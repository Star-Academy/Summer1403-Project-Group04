import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponentsComponent } from './upload-components.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadComponentsComponent', () => {
  let component: UploadComponentsComponent;
  let fixture: ComponentFixture<UploadComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UploadComponentsComponent,
        NzStepsModule,
        NzDividerModule,
        NzInputModule,
        NzButtonModule,
        NzSelectModule,
        NzUploadModule,
        NzIconModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});