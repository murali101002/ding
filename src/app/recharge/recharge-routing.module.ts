import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { RechargeRootComponent } from '../components/recharge-root/recharge-root.component';
import { PaymentComponent } from '../components/payment/payment.component';

const routes: Routes = [
  { path: '', component: RechargeRootComponent},
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
