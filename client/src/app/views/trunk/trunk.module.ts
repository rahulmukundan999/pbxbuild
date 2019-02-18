import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommonModule} from '@angular/common';
import { TrunkComponent } from '../trunk/trunk.component';
import { TrunkDialog } from '../trunk/trunk.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
    { path: '', component: TrunkComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[TrunkComponent,TrunkDialog],
  declarations: [TrunkComponent,TrunkDialog],
  entryComponents:[TrunkComponent,TrunkDialog]
})
export class TrunkModule {}