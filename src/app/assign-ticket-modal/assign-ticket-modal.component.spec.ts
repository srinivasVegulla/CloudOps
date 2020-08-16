import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketModalComponent } from './assign-ticket-modal.component';

describe('AssignTicketModalComponent', () => {
  let component: AssignTicketModalComponent;
  let fixture: ComponentFixture<AssignTicketModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTicketModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
