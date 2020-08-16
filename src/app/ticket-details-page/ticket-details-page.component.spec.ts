import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDetailsPageComponent } from './ticket-details-page.component';

describe('TicketsDetailsPageComponent', () => {
  let component: TicketsDetailsPageComponent;
  let fixture: ComponentFixture<TicketsDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
