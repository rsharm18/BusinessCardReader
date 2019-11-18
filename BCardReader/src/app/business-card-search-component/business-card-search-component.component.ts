import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-card-search-component',
  templateUrl: './business-card-search-component.component.html',
  styleUrls: ['./business-card-search-component.component.css']
})
export class BusinessCardSearchComponentComponent implements OnInit {

  @Output() onFilterBusinessCards:EventEmitter<{fieldName:string,fieldValue:string,showAll:boolean}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  searchByField(fieldName:string,fieldValue:string,showAll:boolean)
  {
   if(!showAll && fieldValue.trim().length==0)
   {
     alert("Please enter a valid Value for "+fieldName)
     return false;
   }
   else{
    let obj={"fieldName":fieldName,"fieldValue":fieldValue,"showAll":showAll};
   this.onFilterBusinessCards.emit(obj);
  }
  }
}
