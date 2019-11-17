import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessCardComponent } from './business-card/business-card.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { BusinessCardDataModel } from './business-card-data-model/business-card-data-model.module';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BCardConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class BCardServicesService {

  private bCards: AngularFirestoreCollection<BusinessCardDataModel>;
  private bCardData: AngularFirestoreDocument<BusinessCardDataModel>;

  username:string;
  password:string;

  allowAccess=false;

  //currentBusinessCard:Subject<BusinessCardDataModel> = new BehaviorSubject<BusinessCardDataModel>(null);

  constructor(private route:Router,public db:AngularFirestore) { 
    this.bCards = this.db.collection<BusinessCardDataModel>(BCardConfig.collection_endpoint)
  }

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

  getCurrentUserName():string
  {
    if(localStorage.getItem("loggedIn") == 'true' && localStorage.getItem('current_user'))
    {

      return localStorage.getItem('current_user');
    }
    else
    {
      this.route.navigate(["/login"]);
    }
  }

  validateUser(userName:string,password:string):boolean
  {
    if(userName=='ravi' && password=='1')
    {
      this.username=userName;
      localStorage.setItem('current_user',this.username);
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
    //newCard.$id = this.db.collection(BCardConfig.collection_endpoint).doc().ref.id

    this.bCards.add(Object.assign({}, newCard));
    
    newCard.getDetail();
    
  }

updateBCard(id:string, bCard:BusinessCardDataModel)
{

  console.log(`from service method ${id} -- ${bCard}`)
  this.bCardData = this.db.doc<BusinessCardDataModel>(`${BCardConfig.collection_endpoint}/${id}`);
  
  this.bCardData.update(Object.assign({}, bCard));

}

  deleteBCard(bCard:BusinessCardDataModel) {
   //console.log(`dic id ${bCard.payload.doc.id}`)
    //Get the task document
    this.bCardData = this.db.doc<BusinessCardDataModel>(`${BCardConfig.collection_endpoint}/${bCard.id}`);
    //Delete the document
    this.bCardData.delete();

    console.log(`Deleted ${bCard.id} ${this.bCardData}`)
  } //deleteTask

}
