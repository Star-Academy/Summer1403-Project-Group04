import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphToolBarComponent } from './graph-tool-bar.component';

describe('GraphToolBarComponent', () => {
  let component: GraphToolBarComponent;
  let fixture: ComponentFixture<GraphToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
