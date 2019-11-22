import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BCardServicesService } from './bcard-services.service';
import { BCardAuthServiceService } from './bcard-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router,private bCardServices:BCardServicesService,private authService:BCardAuthServiceService)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log(`${next.params} <--> this.authService.isLoggedIn() ${this.authService.isLoggedIn}`)
      
      // console.log(`is valid user ? ${this.bCardServices.isLoggedIn()}`)
      console.log(`is valid user ? ${this.authService.isLoggedIn}`)
     // if(!this.bCardServices.isLoggedIn()){
       if(!this.authService.isLoggedIn){
          this.router.navigate(['/login']);
          return false ;
      }
      else
        return true ;
        
  }
  
  
}
