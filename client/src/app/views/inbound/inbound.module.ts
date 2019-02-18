import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommonModule} from '@angular/common';
import { InboundComponent } from '../inbound/inbound.component';
import { InboundDialog } from '../inbound/inbound.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
    { path: '', component: InboundComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[InboundComponent,InboundDialog],
  declarations: [InboundComponent,InboundDialog],
  entryComponents:[InboundComponent,InboundDialog]
})
export class InboundModule {}