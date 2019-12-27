import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalViewComponent } from './regional-view.component';

describe('RegionalViewComponent', () => {
  let component: RegionalViewComponent;
  let fixture: ComponentFixture<RegionalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
