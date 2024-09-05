import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEdgeComponent } from './upload-edge.component';
import { provideHttpClient } from '@angular/common/http';

describe('UploadEdgeComponent', () => {
  let component: UploadEdgeComponent;
  let fixture: ComponentFixture<UploadEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadEdgeComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
