import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RCAchartComponent } from './rcachart.component';

describe('RCAchartComponent', () => {
  let component: RCAchartComponent;
  let fixture: ComponentFixture<RCAchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RCAchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RCAchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
