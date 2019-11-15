import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { BusinessCardsComponent } from '../business-cards/business-cards.component';
import { AuthGuardGuard } from '../auth-guard.guard';

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
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{enableTracing:false})
  ],
  exports: [
      RouterModule
  ],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule { }
