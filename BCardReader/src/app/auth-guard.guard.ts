import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BCardServicesService } from './bcard-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router,private bCardServices:BCardServicesService)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log(`is valid user ? ${this.bCardServices.isLoggedIn()}`)
      console.log(`is valid user ? ${localStorage.getItem("loggedIn")}`)
      if(!this.bCardServices.isLoggedIn()){
          this.router.navigate(['/login']);
          return false ;
      }
      else
        return true ;
        
  }
  
}
