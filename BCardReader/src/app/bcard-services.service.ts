import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BCardServicesService {

  username:string;
  password:string;

  allowAccess=false;
  constructor(private route:Router) { }

  private loggedIn = JSON.parse(localStorage.getItem("loggedIn") || 'false');

  isLoggedIn():boolean
  {
    console.log(`loggedin ? ${this.loggedIn}`);
    
    return this.loggedIn;
  }

  setLoggedIn(val:boolean)
  {
    this.loggedIn = val;
    localStorage.setItem("loggedIn","true");
  }

  validateUser(userName:string,password:string):boolean
  {
    if(userName=='ravi' && password=='1')
    {
      this.username=userName;

      sessionStorage.setItem(this.username,"true");
      localStorage.setItem("loggedIn","true");

      this.route.navigate(["/businessCards"]);
      this.setLoggedIn(true);

      return true;
    }
    else
    {
      return false;
    }
  }
}
