import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommonModule} from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';





const routes: Routes = [
    { path: '', component: PaymentComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    NgxPayPalModule,
    RouterModule.forChild(routes),
  ],
  exports:[PaymentComponent],
  declarations: [PaymentComponent],
  entryComponents:[PaymentComponent]
})
export class PaymentModule {}