import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInsightsComponent } from './log-insights.component';

describe('LogInsightsComponent', () => {
  let component: LogInsightsComponent;
  let fixture: ComponentFixture<LogInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
