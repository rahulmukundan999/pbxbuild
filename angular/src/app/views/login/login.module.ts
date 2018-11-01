import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaterialModule} from '../material-module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../login/auth.guard';
import { AuthGuard1 } from '../login/auth.guard1';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../login/auth.service';
import { AuthService1 } from '../login/auth.service1';


const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[LoginComponent],
  declarations: [LoginComponent],
  entryComponents:[LoginComponent],
  providers: [
  AuthService,
    AuthGuard, AuthService1,
    AuthGuard1],
})
export class LoginModule {}