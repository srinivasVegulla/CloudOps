import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsContainerComponent } from './ticket-details-container.component';

describe('TicketDetailsContainerComponent', () => {
  let component: TicketDetailsContainerComponent;
  let fixture: ComponentFixture<TicketDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
