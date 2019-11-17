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

 @Input() bCard:BusinessCardDataModel;
 @Input() index:number;

 @Output() onUpdateBCard: EventEmitter<{bCard:BusinessCardDataModel,index:number}>;
 @Output() onDeleteBCard: EventEmitter<number>;

 imagePath:SafeHtml;

  constructor(private _sanitizer: DomSanitizer) {
    this.onDeleteBCard  = new EventEmitter();
    this.onUpdateBCard  = new EventEmitter();
   }

  ngOnInit() {
    // console.log(`
    // this.bCard.$name = ${this.bCard.$name}
    // this.bCard.$email= ${this.bCard.$email}
    // this.bCard.$companyName= ${this.bCard.$companyName}
    // this.bCard.$imageurl= ${this.bCard.$imageurl}
    // this.bCard.$userId= ${this.bCard.$userId}
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
    console.log(`triggering updated for ${this.bCard.$name} and ${this.index}`);
    this.onUpdateBCard.emit({bCard:this.bCard,index:this.index});

  }
  deleteBCard()
  {
    this.onDeleteBCard.emit(this.index);
  }

  

}
