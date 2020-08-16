import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRemediationComponent } from './auto-remediation.component';

describe('AutoRemediationComponent', () => {
  let component: AutoRemediationComponent;
  let fixture: ComponentFixture<AutoRemediationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoRemediationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRemediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
