import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BCardServicesService } from '../bcard-services.service';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { BusinessCardDataModel } from '../business-card-data-model/business-card-data-model.module';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { BCardConfig } from '../app.config';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit,OnDestroy {
  

  private businessCards:BusinessCardDataModel[] = [];
  
   currentBCard:BusinessCardDataModel;

   curindex:number = -1;

  bCards:Observable<BusinessCardDataModel[]>;

  constructor(private route:Router, private bCardSerivces:BCardServicesService) 
  {

   
  }


  getUser()
  {
    return this.bCardSerivces.getCurrentUserName();
  }
  logoutMe()
  {
    console.log("you clicked logout");

    this.bCardSerivces.setLoggedIn(false);
    this.route.navigate(["/login"]);

  }
  ngOnInit() {

    console.log(`${this.bCardSerivces.getCurrentUserName()}`)
    this.getAllData()
    
  }


  getAllData()
  {
    this.bCards = this.bCardSerivces.getAllRecords()
    .pipe(
      map(actions => {
        return actions.map(a => {

          //console.log(`Data : ${JSON.stringify(a.payload.doc.data())}`)
          //Get document data
          let data:BusinessCardDataModel = a.payload.doc.data() as BusinessCardDataModel;
          //Get document id
          const id = a.payload.doc.id;
          data.$id= id;
          
          //console.log(`~~~~~ id as ${id} --> ${data.$id}`)
          //this.businessCards.push(data);
          //Use spread operator to add the id to the document data
          return { id,...data };
        });
      })
    )
    ;
  }
  getBCards():BusinessCardDataModel[]
  {
    return this.businessCards;

  }

  updateBCard(obj:{bCard:BusinessCardDataModel,id:string})
  {

    //console.log(`data ====== ${JSON.stringify(obj)}`)
    
    this.currentBCard = obj.bCard
    this.onOpen(true);

   }
 
   deleteBCard(bCard:BusinessCardDataModel)
   {

    this.bCardSerivces.deleteBCard(bCard)
     console.log(`received delete request for ${bCard.$id}`);
   }

   saveBCard(obj:{bCard:BusinessCardDataModel,index:number,isNew:boolean})
   {
     console.log(` ${JSON.stringify(obj)}`);
     this.onOpen(false);
     if(obj.isNew)
     {
       this.bCardSerivces.addNewBcard(obj.bCard);
     }
     else
     {
      this.bCardSerivces.updateBCard(obj.bCard.$id, obj.bCard);

       this.bCardSerivces.addNewBcard(obj.bCard);
     }

   }

   ngOnDestroy(): void {
     console.log("resetting the login");
    //this.bCardSerivces.setLoggedIn(false)
  }

//
  getBCardObj(obj):BusinessCardDataModel
  {
    //console.log(`Calling from getBCardObj ${obj.id}`);

    let tempBCard:BusinessCardDataModel = new BusinessCardDataModel(obj);
    return tempBCard;
  }

  getBCardObjId(obj:any):string
  {
    console.log(`forupdated ${JSON.stringify(obj)}  id : ${obj.id}`);

    return ""+obj.id
  }

  onOpen(bool:boolean)
  {
    this.flag = bool;
    this.blurBG();

    console.log("I am  here");
  }

  flag:boolean = false;


  searchByField(obj)
  {
    //fieldName:string,fieldValue:string,showAll:boolean
   console.log("called searchByName");


  if(obj.fieldName && obj.fieldName.length > 0)
  {
      this.bCards = this.bCards
                    .pipe(
                          map( bcs => bcs.filter(bc =>
                              {
                                console.log(`this.bCards ${JSON.stringify(bc)}`)
                                return bc[obj.fieldName].toLowerCase().indexOf(obj.fieldValue.toLowerCase()) >-1
                               }
                              ) 
                        )
    )
  }
  else{
      this.getAllData();
  }
      
  }

  blurMe:string="container";

  blurBG()
  {
    console.log("blurrr me "+this.flag)
    if(this.flag)
    {
      this.blurMe= "container blur-on blur-element"
    }
    else
    {
      this.blurMe= "container blur-off"
    }
  }
}
