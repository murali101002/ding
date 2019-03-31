import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { RechargePageComponent } from './components/recharge-page/recharge-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { RechargeRootComponent } from './components/recharge-root/recharge-root.component';
import { AppRoutingModule } from './recharge/recharge-routing.module';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomStripeFormComponent } from './components/custom-stripe-form/custom-stripe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RechargePageComponent,
    SummaryPageComponent,
    RechargeComponent,
    RechargeRootComponent,
    PaymentComponent,
    CustomStripeFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
