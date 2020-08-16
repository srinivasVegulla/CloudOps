import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketModalDialogComponent } from './create-ticket-modal-dialog.component';

describe('CreateTicketModalDialogComponent', () => {
  let component: CreateTicketModalDialogComponent;
  let fixture: ComponentFixture<CreateTicketModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTicketModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
