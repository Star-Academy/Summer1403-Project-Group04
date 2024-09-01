import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOverviewDrawerComponent } from './data-overview-drawer.component';

describe('DataOverviewDrawerComponent', () => {
  let component: DataOverviewDrawerComponent;
  let fixture: ComponentFixture<DataOverviewDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataOverviewDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataOverviewDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
