import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccountComponent } from '../account/account.component';
import { DialogOverviewExampleDialog } from '../account/account.component';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
    { path: '', component: AccountComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[AccountComponent,DialogOverviewExampleDialog],
  declarations: [AccountComponent,DialogOverviewExampleDialog],
  entryComponents:[AccountComponent,DialogOverviewExampleDialog]
})
export class AccountModule {}