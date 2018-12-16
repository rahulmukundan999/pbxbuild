import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
  RouterModule,
  FormsModule
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
