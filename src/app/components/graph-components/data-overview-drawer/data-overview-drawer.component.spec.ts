import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOverviewDrawerComponent } from './data-overview-drawer.component';
import { provideHttpClient } from '@angular/common/http';

describe('DataOverviewDrawerComponent', () => {
  let component: DataOverviewDrawerComponent;
  let fixture: ComponentFixture<DataOverviewDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataOverviewDrawerComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataOverviewDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });
});
