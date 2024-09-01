import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponentsComponent } from './upload-components.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UploadComponentsComponent', () => {
  let component: UploadComponentsComponent;
  let fixture: ComponentFixture<UploadComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComponentsComponent],
      providers: [provideAnimationsAsync(), HttpClient , HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
