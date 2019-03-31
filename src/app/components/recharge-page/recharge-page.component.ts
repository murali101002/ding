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
  countryList = [
    { iso: 'GH', name: 'Ghana' },
    { iso: 'RO', name: 'Romania' },
    { iso: 'BZ', name: 'Belize' },
    { iso: 'CI', name: 'Ivory Coast' },
    { iso: 'CL', name: 'Chile' }
  ];
  amountsList = [3, 6, 7, 10, 15];
  carriersList = {};


  rechargeFormId = 1;

  constructor(private dingService: DingService, private utility: UtilityService) {
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
          this.dingService.getProviderByIso(value).subscribe(data => {
            this.carriersList[key] = data;
          });
        }
        break;
      case 'carrier':
        if (!!value) {
          const carrier = this.carriersList[key].filter(carrier => carrier.ProviderCode === value)[0];
          this.rechargeForm.get(key).get('placeholder').setValue(carrier['ValidationRegex']);
          this.rechargeForm.get(key).get('regex').setValue(carrier['ValidationRegex']);
          this.rechargeForm.get(key).get('phone').setValidators([Validators.required, Validators.pattern(carrier['ValidationRegex'])])
        }
        break;
      case 'amount':
    }
  }

  addRechargeObject(): void {
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
