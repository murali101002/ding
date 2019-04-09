import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions, CardDataOptions } from "ngx-stripe";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {

  elements: Elements;
  cardNumber: StripeElement;
  cardCvc: StripeElement;
  cardExp: StripeElement;
  cardData: CardDataOptions;

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.cardNumber) {
          this.cardNumber = this.elements.create('cardNumber', {});
          this.cardNumber.mount('#card-number');
        }
        if (!this.cardCvc) {
          this.cardCvc = this.elements.create('cardCvc', {});
          this.cardCvc.mount('#card-cvc');
        }
        if (!this.cardExp) {
          this.cardExp = this.elements.create('cardExpiry', {});
          this.cardExp.mount('#card-expiry');
        }
      });
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.cardNumber, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
