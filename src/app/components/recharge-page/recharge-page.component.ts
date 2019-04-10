import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DingService } from 'src/app/services/ding.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-recharge-page',
  templateUrl: './recharge-page.component.html',
  styleUrls: ['./recharge-page.component.scss']
})
export class RechargePageComponent implements OnInit {

  rechargeForm = new FormGroup({});
  rechargeFormKeys = [];
  countryList = [];
  amountsList = [3, 6, 7, 10, 15];
  carriersList = {};
  providersList = [];
  regionsList = [];


  rechargeFormId = 1;

  constructor(private dingService: DingService, private utility: UtilityService) {
    const obj = {
      "SkuCode": "SL_AF_TopUp",
      "SendValue": 0.00,
      "SendCurrencyIso": "USD",
      "AccountNumber": "23277640223",
      "DistributorRef": "SL_04092019",
      "ValidateOnly": false
    };
    //this.dingService.sendTransfer(obj).subscribe(data => console.log(data));
    this.dingService.getProviderByIso().subscribe(providers => {
      this.providersList = providers;
      let countries: any[] = this.providersList.map(provider => provider['CountryIso']);
      countries = Array.from(new Set(countries));
      this.dingService.getCountries(countries).subscribe(data => {
        this.countryList = data;
      });
      this.dingService.getRegions(countries).subscribe(data => {
        this.regionsList = data;
        let distinctProv;
        let distinctRegions;
        // console.log(this.providersList);
        distinctProv = Array.from(new Set(this.providersList.map(provider => provider['ProviderCode'])));
        distinctRegions = Array.from(new Set(this.regionsList.map(region => region['RegionCode'])));
        this.dingService.getProducts(countries, distinctProv, distinctRegions).subscribe(productsInfo => {
          // this.regionsList = productsInfo;
          console.log(productsInfo);
        });
      });
    });
  }

  ngOnInit() {
    this.addRechargeObject();
    // this.rechargeForm['recharge'].controls['country'].valueChanges.subscribe(value => {
    //   console.log(value);
    //   this.dingService.getProviderByIso(value.recharge.country).subscribe(data => this.carriersList = data);
    // });
  }

  onFormChange(key, field, value) {
    switch (field) {
      case 'country':
        if (!!value) {
          // this.dingService.getProviderByIso(value).subscribe(data => {
          //   this.carriersList[key] = data;
          // });
        }
        break;
      case 'carrier':
        // if (!!value) {
        //   const carrier = this.carriersList[key].filter(carrier => carrier.ProviderCode === value)[0];
        //   this.rechargeForm.get(key).get('placeholder').setValue(carrier['ValidationRegex']);
        //   this.rechargeForm.get(key).get('regex').setValue(carrier['ValidationRegex']);
        //   this.rechargeForm.get(key).get('phone').setValidators([Validators.required, Validators.pattern(carrier['ValidationRegex'])])
        // }
        break;
      case 'amount':
    }
  }

  addRechargeObject(): void {
    // tslint:disable-next-line:curly
    if (this.rechargeFormId > 3) return;
    const formId = `{recharge${this.rechargeFormId}`;
    this.rechargeFormKeys.push(formId);
    this.rechargeForm.addControl(formId, new FormGroup({
      country: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      carrier: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      regex: new FormControl(),
      placeholder: new FormControl('')
    }));
    this.rechargeFormId++;
  }

  submitForm(formKey) {
    const rechargeObj = [];
    Object.keys(this.rechargeForm.value).forEach(key => {
      if (this.rechargeForm.get(key).valid) {
        const formValue = this.rechargeForm.get(key).value;
        const countryObj = this.countryList.filter(country => country['iso'] === formValue.country);
        const providerObj = this.carriersList[formKey].filter(provider => provider['ProviderCode'] === formValue.carrier);
        rechargeObj.push({ ...this.rechargeForm.get(key).value, country: countryObj[0], carrier: providerObj[0] });
      }
    })
    this.utility.publishRechargeInfo(rechargeObj);
  }

}
