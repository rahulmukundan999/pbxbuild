import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import { RingComponent } from '../ring/ring.component';
import { RingDialog } from '../ring/ring.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    { path: '', component: RingComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RingComponent,RingDialog],
  declarations: [RingComponent,RingDialog],
  entryComponents:[RingComponent,RingDialog]
})
export class RingModule {}