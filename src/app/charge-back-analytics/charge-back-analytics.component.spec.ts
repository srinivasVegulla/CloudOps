import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeBackAnalyticsComponent } from './charge-back-analytics.component';

describe('ChargeBackAnalyticsComponent', () => {
  let component: ChargeBackAnalyticsComponent;
  let fixture: ComponentFixture<ChargeBackAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeBackAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeBackAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
