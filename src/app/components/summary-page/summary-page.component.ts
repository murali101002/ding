import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FbStorageService } from 'src/app/services/fb-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {

  rechargeInfo = [];
  totalCharge = 0;
  constructor(private utility: UtilityService, private router: Router, private fbService: FbStorageService) { }

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
    this.router.navigate(['payment']);
    this.fbService.addTransaction({
      name: 'Object',
      value: 'Object'
    });
  }

}
