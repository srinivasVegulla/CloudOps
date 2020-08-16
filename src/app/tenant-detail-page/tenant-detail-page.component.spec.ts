import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDetailPageComponent } from './tenant-detail-page.component';

describe('TenantDetailPageComponent', () => {
  let component: TenantDetailPageComponent;
  let fixture: ComponentFixture<TenantDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
