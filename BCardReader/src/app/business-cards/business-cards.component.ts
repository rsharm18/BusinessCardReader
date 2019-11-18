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
  
  private currentBCard:BusinessCardDataModel;

  private curindex:number = -1;

  private bCards:Observable<BusinessCardDataModel[]>;

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
    
    //if(this.db.collection(BCardConfig.collection_endpoint).get().
    // this.bCardSerivces.currentBusinessCard.subscribe(bCard =>{
    //   if(bCard!=null)
    //   {
    //     this.businessCards.push(bCard)
    //   }

    // });

    // let obj1:any = {"name" : "Ravi Sharma"   ,   
    //   "email":"a@a.com",      
    //   "companyName":"A",
    //   "userId":"ravi"     
    //   }

    //   let obj2:any = {"name" : "Foram Dalal"   ,   
    //   "email" :"fd@gmail.com",      
    //   "companyName" :"FD",
    //   "userId" :"ravi"     
    //   }

    //   let obj3:any = {"name" : "Alex N"   ,   
    //   "email" :"alexN@gmail.com",      
    //   "companyName" :"Anchor",
    //   "userId" :"ravi"     
    //   }
    //   let obj4:any = {"name" : "Carl P"   ,   
    //   "email" :"CarlP@gmail.com",      
    //   "companyName" :"Gnot",
    //   "userId" :"ravi"     
    //   }

    //   this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj1));
    //   this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj2));
    //   this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj3));
    //   this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj4));

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

    // this.curindex = obj.index;
    // console.log(`index is ${obj.index}`);

    // console.log(`this.businessCards['index'] ${this.businessCards[obj.index].$name}`)
    // this.currentBCard = this.businessCards[obj.index];

    // console.log(`received update request for ${obj.bCard.$name} ${obj['index']}`);
    // console.log(`this.currentBCard ${this.currentBCard.$name}`)
    // this.service.updateTodoItem(obj.item,obj.index);
   }
 
   deleteBCard(bCard:BusinessCardDataModel)
   {

    this.bCardSerivces.deleteBCard(bCard)

     console.log(`received delete request for ${bCard.$id}`);
     //this.businessCards.splice(index, 1);
     //this.service.deleteTodoItem(index);
   }

   saveBCard(obj:{bCard:BusinessCardDataModel,index:number,isNew:boolean})
   {
     console.log(` ${JSON.stringify(obj)}`);
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
    console.log("I am  here");
  }

  flag:boolean;


  searchByField(fieldName:string,fieldVal:string)
  {
   console.log("called searchByName");

  //  let arr:BusinessCardDataModel[] = new Array<BusinessCardDataModel>();
  //   this.bCards= this.bCardSerivces.getAllRecords()
  //    .pipe(
  //     map(actions => {
  //       console.log(` data actions ${actions} ======================== `)
  //       return actions.map(a => {
  
  //        // console.log(`Data : ${JSON.stringify(a.payload.doc.data())}`)
  //         //Get document data
  //         let data:BusinessCardDataModel = a.payload.doc.data() as BusinessCardDataModel;
  //         //Get document id
  //         const id = a.payload.doc.id;
  //         data.$id= id;
  //         data.id= id;

  //         console.log(` data userid ${data['userId']}`)
  //         const ub = a.payload.doc.data().filter(item => item.userId == 'foram');
         
  //         //console.log(`~~~~~ id as ${id} --> ${data.$id}`)
  //         //this.businessCards.push(data);
  //         //Use spread operator to add the id to the document data
  //         return ub;
  //       });
  //     })
  //   )

  if(fieldVal.length > 0)
  {
  this.bCards = this.bCards.pipe(
                    map( bcs => bcs.filter(bc =>{
                      console.log(`this.bCards ${JSON.stringify(bc)}`)
                       return bc[fieldName].toLowerCase().indexOf(fieldVal.toLowerCase()) >-1
                    }) )
    )
                  }
                  else{
                    this.getAllData();
                  }
    //console.log(` %%%%%%%%%%%%%%%%% ${arr} %%%%%%%%%%%%%`)
   
    
   
  }
}
