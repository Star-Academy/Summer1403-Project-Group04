import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNodeComponent } from './upload-node.component';

describe('UploadNodeComponent', () => {
  let component: UploadNodeComponent;
  let fixture: ComponentFixture<UploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
