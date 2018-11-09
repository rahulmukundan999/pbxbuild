import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommonModule} from '@angular/common';
import { OutboundComponent } from '../outbound/outbound.component';
import { OutboundDialog } from '../outbound/outbound.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
    { path: '', component: OutboundComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[OutboundComponent,OutboundDialog],
  declarations: [OutboundComponent,OutboundDialog],
  entryComponents:[OutboundComponent,OutboundDialog]
})
export class OutboundModule {}