import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeRootComponent } from '../components/recharge-root/recharge-root.component';
import { StripePaymentComponent } from '../components/stripe-payment/stripe-payment.component';

const routes: Routes = [
  { path: '', component: RechargeRootComponent},
  { path: 'payment', component: StripePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
