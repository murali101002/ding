import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStripeFormComponent } from './custom-stripe-form.component';

describe('CustomStripeFormComponent', () => {
  let component: CustomStripeFormComponent;
  let fixture: ComponentFixture<CustomStripeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomStripeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStripeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
