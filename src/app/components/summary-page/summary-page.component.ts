import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {

  rechargeInfo = [];
  totalCharge = 0;
  constructor(private utility: UtilityService) { }

  ngOnInit() {
    this.utility.getRechargeInfo$.subscribe(data => {
      this.totalCharge = 0;
      if (typeof (data) === 'object') {
        this.rechargeInfo = data;
        this.totalCharge = this.totalCharge + this.rechargeInfo.reduce((a, b) => a + +b.amount, 0);
      }
    });
  }
  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: '',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'DING',
      description: 'Payment',
      amount: this.totalCharge * 100
    });

  }

}
