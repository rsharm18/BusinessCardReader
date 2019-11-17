import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter, ViewChild } from '@angular/core';
import { BusinessCardDataModel } from '../business-card-data-model/business-card-data-model.module';
import { BCardServicesService } from '../bcard-services.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-new-business-card-component',
  templateUrl: './new-business-card-component.component.html',
  styleUrls: ['./new-business-card-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBusinessCardComponentComponent implements OnChanges,OnInit {

  @Input() bCard:BusinessCardDataModel;
  @Input() curindex:number;
  @Output() onSaveBCard:EventEmitter<{bCard:BusinessCardDataModel,index:number,isNew:boolean}>;

  
  private name:string;
  private emailID:string;
  private orgName:string;
  private inputFile:string;
  files:File;
  base64Image:string
  imagePath:SafeHtml;
   showImage:boolean = false;

  private editMode:boolean=false;
  
  constructor(public bCardSerivces:BCardServicesService,private _sanitizer: DomSanitizer) {

    
    this.onSaveBCard = new EventEmitter();

    

    

    
   }

  ngOnInit() {
    console.log(`input in the new component ${this.bCard}`);

    console.log(` ****************** input in the new component ${this.bCard} ******************`);

    this.imagePath = "../../assets/no-image-found.jpg";

    if(this.bCard)
    {
      this.name = this.bCard.$name
      this.emailID  = this.bCard.$email
      this.orgName = this.bCard.$companyName
    }
    else{
      this.name = ""
      this.emailID  = ""
      this.orgName = ""

      console.log("**************** in else **************")
    }

    //document.getElementById("imgDiv").style.display="none";
  }
  
  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.bCard;
    const index:SimpleChange = changes.curindex;

    console.log('prev value: ', name.previousValue);
    console.log('got name: ', name.currentValue);
    console.log(`cusIndex ${this.curindex} ${this.bCard}`);

    if(this.bCard)
    {
      this.editMode = true;
      this.name = this.bCard.$name
      this.emailID  = this.bCard.$email
      this.orgName = this.bCard.$companyName;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.bCard.$imageurl);
    }

  }

  

  saveBCard()
  {

    let obj:any = {
      "name"        : this.name  ,   
      "email"       : this.emailID,      
      "companyName" : this.orgName,
      "imageurl"    : this.base64Image,
      "userId"      :"ravi"     
      }

     let bCard:BusinessCardDataModel =  new BusinessCardDataModel(obj)
    
    this.onSaveBCard.emit({bCard:bCard,index:this.curindex,isNew:this.editMode});
    
    

    // if(this.editMode)
    // {

    // }
    // else
    // {
    //   this.bCardSerivces.addNewBcard();
    // }

  }

  saveReset()
  {
    console.log("clicked on Reste")
    this.name = ""
      this.emailID  =""
      this.orgName = ""
      this.editMode = false;
  }

  

  changeListener(event) {
    
    this.files = event.target.files[0];
    var reader = new FileReader();
    console.log(`file ${this.files.name}`);
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files);

}


_handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Image = btoa(binaryString);  // Converting binary string data.

    //console.log(`images is ${this.filestring}`);

    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.base64Image);
    this.showImage = true

    
    console.log("generated the base64Image "+this.base64Image+"\n **************")
    //document.getElementById("imgDiv").setAttribute("src",this.imagePath);
    //document.getElementById("imgDiv").style.display="block";
}


}
