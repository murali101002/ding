import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  getRechargeInfo$ = new BehaviorSubject('default message');
  getRechargeInfo = this.getRechargeInfo$.asObservable();


  constructor() { }

  public publishRechargeInfo(message) {
    this.getRechargeInfo$.next(message);
  }
}
