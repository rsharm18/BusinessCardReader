import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { BusinessCardsComponent } from '../business-cards/business-cards.component';
import { AuthGuardGuard } from '../auth-guard.guard';
import { VerifyEmailComponentComponent } from '../verify-email-component/verify-email-component.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }, 
  {
    path:'businessCards', component:BusinessCardsComponent,
    canActivate:[AuthGuardGuard]
},
  { path: '',
    redirectTo: '/businessCards',
    pathMatch: 'full'
  },
  
  {
    path: 'verify-email-address', 
    component: VerifyEmailComponentComponent
  },
  {
    path: 'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'register-user',
    component:SignUpComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{useHash: true})
  ],
  exports: [
      RouterModule
  ],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule { }
