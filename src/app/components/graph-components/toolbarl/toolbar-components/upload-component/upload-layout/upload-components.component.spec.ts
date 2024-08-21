import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponentsComponent } from './upload-components.component';

describe('UploadComponentsComponent', () => {
  let component: UploadComponentsComponent;
  let fixture: ComponentFixture<UploadComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
