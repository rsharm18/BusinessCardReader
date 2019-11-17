import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BCardServicesService } from '../bcard-services.service';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { BusinessCardDataModel } from '../business-card-data-model/business-card-data-model.module';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit,OnDestroy {
  

  private businessCards:BusinessCardDataModel[] = [];
  
  private currentBCard:BusinessCardDataModel;

  private curindex:number = -1;

  constructor(private route:Router, private bCardSerivces:BCardServicesService) { }


  logoutMe()
  {
    console.log("you clicked logout");

    this.bCardSerivces.setLoggedIn(false);
    this.route.navigate(["/login"]);

  }
  ngOnInit() {

    this.bCardSerivces.currentBusinessCard.subscribe(bCard =>{
      if(bCard!=null)
      {
        this.businessCards.push(bCard)
      }

    });

    let obj1:any = {"name" : "Ravi Sharma"   ,   
      "email":"a@a.com",      
      "companyName":"A",
      "userId":"ravi"     
      }

      let obj2:any = {"name" : "Foram Dalal"   ,   
      "email" :"fd@gmail.com",      
      "companyName" :"FD",
      "userId" :"ravi"     
      }

      let obj3:any = {"name" : "Alex N"   ,   
      "email" :"alexN@gmail.com",      
      "companyName" :"Anchor",
      "userId" :"ravi"     
      }
      let obj4:any = {"name" : "Carl P"   ,   
      "email" :"CarlP@gmail.com",      
      "companyName" :"Gnot",
      "userId" :"ravi"     
      }

      this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj1));
      this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj2));
      this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj3));
      this.bCardSerivces.addNewBcard(new BusinessCardDataModel(obj4));

  }


  getBCards():BusinessCardDataModel[]
  {
    return this.businessCards;

  }

  updateBCard(obj:{bCard:BusinessCardDataModel,index:number})
  {

    this.curindex = obj.index;
    console.log(`index is ${obj.index}`);

    console.log(`this.businessCards['index'] ${this.businessCards[obj.index].$name}`)
    this.currentBCard = this.businessCards[obj.index];

    console.log(`received update request for ${obj.bCard.$name} ${obj['index']}`);
    console.log(`this.currentBCard ${this.currentBCard.$name}`)
    // this.service.updateTodoItem(obj.item,obj.index);
   }
 
   deleteBCard(index:number)
   {
     console.log(`received delete request for ${index}`);
     this.businessCards.splice(index, 1);
     //this.service.deleteTodoItem(index);
   }

   saveBCard(obj:{bCard:BusinessCardDataModel,index:number,isNew:boolean})
   {
     //console.log(`Received ${obj}`);

     if(obj.isNew)
     {
       this.businessCards[obj.index] = obj.bCard;
     }
     else
     {
       this.bCardSerivces.addNewBcard(obj.bCard);
     }

   }

   ngOnDestroy(): void {
     console.log("resetting the login");
    //this.bCardSerivces.setLoggedIn(false)
  }
}
