import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicActivitiesComponent } from './periodic-activities.component';

describe('PeriodicActivitiesComponent', () => {
  let component: PeriodicActivitiesComponent;
  let fixture: ComponentFixture<PeriodicActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
