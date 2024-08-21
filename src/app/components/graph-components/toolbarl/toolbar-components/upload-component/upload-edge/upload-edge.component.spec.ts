import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEdgeComponent } from './upload-edge.component';

describe('UploadEdgeComponent', () => {
  let component: UploadEdgeComponent;
  let fixture: ComponentFixture<UploadEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadEdgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
