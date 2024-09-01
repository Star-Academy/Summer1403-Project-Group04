import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNodeComponent } from './upload-node.component';
import { provideHttpClient } from '@angular/common/http';

describe('UploadNodeComponent', () => {
  let component: UploadNodeComponent;
  let fixture: ComponentFixture<UploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNodeComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
