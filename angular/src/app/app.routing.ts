import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { DefaultLayout1Component } from './containers';
import { AuthGuard } from './views/login/auth.guard';
import { AuthGuard1 } from './views/login/auth.guard1';
import { AuthService } from './views/login/auth.service';
import { AuthService1 } from './views/login/auth.service1';
import {UserComponent} from './views/user/user.component'
import { RegisterComponent } from './views/register/register.component';
//import { ExtensionComponent } from './views/extension/extension.component';
import { AccountComponent } from './views/account/account.component';
//import { InboundComponent } from './views/inbound/inbound.component';
//import { OutboundComponent } from './views/outbound/outbound.component';
import { ReceptionistComponent } from './views/receptionist/receptionist.component';
//import { RingComponent,RingDialog } from './views/ring/ring.component';
//import { TrunkComponent } from './views/trunk/trunk.component';
//import { ExtensionModule} from './views/extension/extension.module';
import {
  MatFormFieldModule,
 MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  
} from '@angular/material';
//import { ExtensionComponent } from './views/extension/extension.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './views/login/login.module#LoginModule', 
       data: {
      title: 'Login Page'
    }
  },     
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
   {
    path:'payment',
    loadChildren:'./views/payment/payment.module#PaymentModule',
    canActivate: [AuthGuard1]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'extension',
        loadChildren: './views/extension/extension.module#ExtensionModule'

      },
      {
        path: 'account',
        loadChildren: './views/account/account.module#AccountModule'
      },
      {
        path: 'inbound',
        loadChildren: './views/inbound/inbound.module#InboundModule'
      },
      {
        path: 'outbound',
        loadChildren: './views/outbound/outbound.module#OutboundModule'
      },
      {
        path: 'receptionist',
        component:ReceptionistComponent
      },
      {
        path: 'ring',
        loadChildren: './views/ring/ring.module#RingModule'
      },
      {
        path: 'trunk',
        loadChildren: './views/trunk/trunk.module#TrunkModule'
      }
    ]
  },
  {
    path: '',
    component: DefaultLayout1Component,
    canActivate: [AuthGuard1],
    data: {
      title: 'Home'
    },
    children: [
      {
        path:'user',
        loadChildren:'./views/user/user.module#UserModule'
      }
    ]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),  
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
   ],
  exports: [ 
    RouterModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule, 
  ],
  providers: [
    AuthService,
      AuthGuard, AuthService1,
      AuthGuard1]
})
export class AppRoutingModule {}
