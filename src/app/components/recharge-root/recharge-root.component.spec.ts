import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeRootComponent } from './recharge-root.component';

describe('RechargeRootComponent', () => {
  let component: RechargeRootComponent;
  let fixture: ComponentFixture<RechargeRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
