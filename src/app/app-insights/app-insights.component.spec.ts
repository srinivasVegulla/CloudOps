import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInsightsComponent } from './app-insights.component';

describe('AppInsightsComponent', () => {
  let component: AppInsightsComponent;
  let fixture: ComponentFixture<AppInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
