import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuageChartsComponent } from './guage-charts.component';

describe('GuageChartsComponent', () => {
  let component: GuageChartsComponent;
  let fixture: ComponentFixture<GuageChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuageChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuageChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
