import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargePageComponent } from './recharge-page.component';

describe('RechargePageComponent', () => {
  let component: RechargePageComponent;
  let fixture: ComponentFixture<RechargePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
