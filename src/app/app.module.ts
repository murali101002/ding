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
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { RechargePageComponent } from './components/recharge-page/recharge-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { RechargeRootComponent } from './components/recharge-root/recharge-root.component';
import { AppRoutingModule } from './recharge/recharge-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    RechargePageComponent,
    SummaryPageComponent,
    RechargeRootComponent,
    StripePaymentComponent
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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgxStripeModule.forRoot('pk_test_5s4XD1cRVrwHtBAfpu3iy6Mw'),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
