import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGraphComponent } from './get-graph.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('GetGraphComponent', () => {
  let component: GetGraphComponent;
  let fixture: ComponentFixture<GetGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetGraphComponent],
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
