import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ExtensionComponent } from '../extension/extension.component';
import { ExtensionDialog } from '../extension/extension.component';
import {MaterialModule} from './material-module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
    { path: '', component: ExtensionComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[ExtensionComponent,ExtensionDialog],
  declarations: [ExtensionComponent,ExtensionDialog],
  entryComponents:[ExtensionComponent,ExtensionDialog]
})
export class ExtensionModule {}