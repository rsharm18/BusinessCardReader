import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessCardComponent } from './business-card/business-card.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { BusinessCardDataModel } from './business-card-data-model/business-card-data-model.module';

@Injectable({
  providedIn: 'root'
})
export class BCardServicesService {

  private businessCards:BusinessCardDataModel[] = [];

  username:string;
  password:string;

  allowAccess=false;

  currentBusinessCard:Subject<BusinessCardDataModel> = new BehaviorSubject<BusinessCardDataModel>(null);

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
    localStorage.setItem("loggedIn",""+val);
  }

  validateUser(userName:string,password:string):boolean
  {
    if(userName=='ravi' && password=='1')
    {
      this.username=userName;

      sessionStorage.setItem(this.username,"true");
      
      this.setLoggedIn(true);

      this.route.navigate(["/businessCards"]);
      

      return true;
    }
    else
    {
      return false;
    }
  }

  //add a new Business Card
  addNewBcard(newCard:BusinessCardDataModel)
  {
    newCard.getDetail();
    this.currentBusinessCard.next(newCard);
    this.businessCards.push(newCard);
  }
}
