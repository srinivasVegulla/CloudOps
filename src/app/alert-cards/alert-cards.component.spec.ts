import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCardsComponent } from './alert-cards.component';

describe('AlertCardsComponent', () => {
  let component: AlertCardsComponent;
  let fixture: ComponentFixture<AlertCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
