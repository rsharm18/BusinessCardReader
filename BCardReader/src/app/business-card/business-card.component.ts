import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BusinessCardDataModel } from '../business-card-data-model/business-card-data-model.module';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {


 @Input() index:number;

 @Input() bCard:BusinessCardDataModel;


 @Output() onUpdateBCard: EventEmitter<{bCard:BusinessCardDataModel,id:string}>;
 @Output() onDeleteBCard: EventEmitter<BusinessCardDataModel>;
 
 
 imagePath:SafeHtml;
 id:string;
 
  constructor(private _sanitizer: DomSanitizer) {
    this.onDeleteBCard  = new EventEmitter();
    this.onUpdateBCard  = new EventEmitter();
   }

  ngOnInit() {
    this.id = this.bCard.id;

    // console.log(` ******************************************
    // this.bCard.$name = ${this.bCard.$name}
    // this.bCard.$email= ${this.bCard.$email}
    // this.bCard.$companyName= ${this.bCard.$companyName}
    
    // this.bCard.$userId= ${this.bCard.$userId}
    // this.bCard.$id = ${this.bCard.$id}
    // `)
    this.getImage();
   }

  getName()
  {
    this.bCard.$name;
    this.bCard.$email
    this.bCard.$companyName
    this.bCard.$imageurl
    this.bCard.$userId
  }

  getImage()
  {
    if(this.bCard.$imageurl == '../../assets/no-image-found.jpg')
    {
      this.imagePath="../../assets/no-image-found.jpg";
    }
    else
    {
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    + this.bCard.$imageurl);
    }
    
  }
  updateBCard()
  {

    if(!confirm("Update Request Received for "+this.bCard.$name+"!! \n Are you sure?"))
    {
      return false;
    }
    console.log(`is instance ? ${ this.bCard instanceof BusinessCardDataModel}`);
    console.log(`triggering updated for ${this.bCard} and ${this.bCard.$id}`);

    
    console.log(` calling from Update 
    
    this.bCard.$name = ${this.bCard.$name}
    this.bCard.$email= ${this.bCard.$email}
    this.bCard.$companyName= ${this.bCard.$companyName}
    
    this.bCard.$userId= ${this.bCard.$userId}
    this.bCard.$id = ${this.bCard.$id}
    `)

    this.onUpdateBCard.emit({bCard:this.bCard,id:this.id});

  }
  deleteBCard()
  {
    if(!confirm("Delete Request Received for "+this.bCard.$name+"!! \nThis can't be undone \n Are you sure?"))
    {
      return false;
    }
    console.log(`triggering updated for ${this.bCard} and ${this.bCard.$id}`);
    this.onDeleteBCard.emit(this.bCard);
  }

  viewImageInNewPage()
  {
    let w = window.open('about:blank');
    let image = new Image();
    image.src = 'data:image/jpg;base64,' + this.bCard.$imageurl;
    setTimeout(function(){
      w.document.write(image.outerHTML);
    }, 0);

  }

}
