import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootModalComponent } from './troubleshoot-modal.component';

describe('TroubleshootModalComponent', () => {
  let component: TroubleshootModalComponent;
  let fixture: ComponentFixture<TroubleshootModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
