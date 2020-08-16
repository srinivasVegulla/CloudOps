import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRemediationLogsComponent } from './auto-remediation-logs.component';

describe('AutoRemediationLogsComponent', () => {
  let component: AutoRemediationLogsComponent;
  let fixture: ComponentFixture<AutoRemediationLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoRemediationLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRemediationLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
