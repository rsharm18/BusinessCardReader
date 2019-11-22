import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter, ViewChild } from '@angular/core';
import { BusinessCardDataModel } from '../business-card-data-model/business-card-data-model.module';
import { BCardServicesService } from '../bcard-services.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient,  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-business-card-component',
  templateUrl: './new-business-card-component.component.html',
  styleUrls: ['./new-business-card-component.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewBusinessCardComponentComponent implements OnChanges,OnInit {

  @Input() bCard:BusinessCardDataModel;
  @Input() docID:string;
  @Input() curindex:number;
  @Output() onSaveBCard:EventEmitter<{docID:string,bCard:BusinessCardDataModel,index:number,isNew:boolean}>;

  
  
   name:string;
   email:string;
   companyName:string;
   otherInfo:string
   phoneNumber:string

   allowCamera:boolean;
   value:string = "style='width: 0%'";

  files:File;
  base64Image:string = ""
  imagePath:SafeHtml;
  showImage:boolean = false;
  

  showSpinner: boolean = false;

  TextExtractionStatus="";
  private editMode:boolean=false;
  
  constructor(public bCardSerivces:BCardServicesService,private _sanitizer: DomSanitizer, private http: HttpClient) {
    this.onSaveBCard = new EventEmitter();
   }

  ngOnInit() {
    
    console.log(` ****************** input in the new component ${this.bCard && this.bCard.$name || ""} ******************`);

    // this.imagePath = "../../assets/no-image-found.jpg";

      this.name       = this.bCard && this.bCard.$name               || '';
      this.email    = this.bCard && this.bCard.$email              || null;
      this.companyName    = this.bCard && this.bCard.$companyName        || null;
      this.phoneNumber      = this.bCard && this.bCard.$phoneNumber        || null;
      this.otherInfo  = this.bCard && this.bCard.$otherInfo          || null  ;

      
      if (this.bCard)
      {
        console.log("found this.bCArd")
        if(this.bCard.$imageurl.endsWith('no-image-found.jpg'))
        {
            this.imagePath = this.bCard.$imageurl;
        }
        else{
        this.setImage(this.bCard.$imageurl,false);
        }
      }
      else
        this.imagePath ="../../assets/no-image-found.jpg";
   
      this.TextExtractionStatus="";
    //document.getElementById("imgDiv").style.display="none";
  }
  
  //called when the BCardDatamodel ref is updated
  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.bCard;
    const index:SimpleChange = changes.curindex;

    console.log(`you invoked onChange on New card compoenet ${this.docID}`)
   // console.log(`cusIndex ${this.curindex} ${JSON.stringify(this.bCard)}`);

    if(this.bCard)
    {
      console.log(`ngOnChanges this is an update task ${this.docID}`)

      this.editMode = true;

      this.name = this.bCard.$name
      this.email  = this.bCard.$email
      this.companyName = this.bCard.$companyName;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.bCard.$imageurl);
    }

    

  }

  

  /**
   * SAVE THE BUSINESS CARD 
   */

  saveBCard()
  {

    console.log(`The current user ${this.bCardSerivces.getCurrentUserName()}`);

    //do not add id as it overlaps with document's id
    let obj:any = {
      "name"        : this.name  ,   
      "email"       : this.email,      
      "companyName" : this.companyName,
      "imageurl"    : this.base64Image?this.base64Image: "../../assets/no-image-found.jpg",
      "userId"      : this.bCardSerivces.getCurrentUserName()?this.bCardSerivces.getCurrentUserName():"ravi" , 
      "otherInfo"   : this.otherInfo,  
      "phoneNumber" : this.phoneNumber
      }

      this.onSaveBCard.emit({docID:this.docID,bCard:obj,index:this.curindex,isNew:!this.editMode});
    
  }


  saveReset()
  {
      console.log("clicked on Reste")
      this.name = ""
      this.email  =""
      this.companyName = ""
      this.base64Image="";
      this.imagePath="../../assets/no-image-found.jpg";
      this.otherInfo="";
      this.phoneNumber="";

      this.editMode = false;

  }

  
  //convert the uploaded image to base64
  changeListener(event) {
    
    this.value ="style='width: 0%'"; 0;

    this.showSpinner = true;

    this.files = event.target.files[0];
    var reader = new FileReader();
    console.log(`file ${this.files.name}`);
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files);

}

_handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64Image = btoa(binaryString);  // Converting binary string data.

    this.showSpinner = true;

    //console.log(`images is ${this.filestring}`);

    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.base64Image);
    this.showImage = true
    this.setImage(this.base64Image,true)

    this.value = "style='width: 25%'";
    $("#bcImg").attr("src", 'data:image/jpg;base64,'+ this.base64Image);
    
    
    this.TextExtractionStatus=" Please wait Reaading Image....";

    this.readTextFromImage();

    // console.log(`imagePath ${this.imagePath}`)

    // console.log(` ******************* this.base64Image ${this.base64Image} !!!!!!!!!!~~@@@************88`)
  
}

/**
 * 
 * @param b64String takes a base64 image as input
 */
setImage(b64String:string,allowReadText:boolean)
{
  this.base64Image=b64String;

  this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.base64Image);
  //console.log( `b64String : ${b64String}`)
  if(allowReadText)
    this.readTextFromImage();
  else
  {
    this.showSpinner = false;
  }
}

//call the google vision api to extract the text
readTextFromImage()
{

  this.showSpinner = true;
  this.value = "style='width: 40%'";
  console.log("calling the api")
  
  let queryString:string=environment.host+"?key="+environment.key;

  let headers = new Headers({ 'Content-Type': 'text/plain' });
  let options = ({ headers: headers });

  this.http.post(
    queryString,
    JSON.stringify(
      {
        "requests": 
        [
            {
              "image": {
                          "content":this.base64Image
                        },
              "features": 
              [
                {
                "type": "TEXT_DETECTION"
                }
              ]
            }
        ]
      }
    )
  ).pipe(

    map(response => response['responses']

        .map(result => result['fullTextAnnotation'])

        .map(result => result['text'])

        )

).subscribe(data =>
    {
      console.dir(`data is ${data}`)
      //console.log(`\n\n JSON data is ${JSON.stringify(data)}`)

      this.value = "style='width: 75%'";
      //console.log(` description : ${data["responses"][0]["textAnnotations"][0]["description"]}`)
      this.parseData(data.toString());
    })

}



parseData(data: string) {

  // reinitialize the values to remove old data if still present 
  this.name=""
  this.phoneNumber = '';
  this.email = "";
  this.companyName = "";
  this.otherInfo = "";

  var data1 = data.split('\n');

  this.value = "style='width: 00%'";

  data1.forEach(row => {

    // check for email 
    if(row.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) >= 0) {
      this.email = row;

    }
    //check for phone
    else if(row.toUpperCase().indexOf("PHONE")>-1 || row.toUpperCase().indexOf("MOBILE")>-1 || row.search(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/) >= 0) {

      row = row.toUpperCase();
      
      if(row.indexOf("PHONE")>-1)
      {
        row = row.replace("PHONE","");
      }
      
      if(row.indexOf("MOBILE")>-1)
      {
        row = row.replace("MOBILE","");
      }

      if(row.indexOf(":")>-1)
      {
        row = row.replace(":","");
      }

      this.phoneNumber = row;

    } else if(row.search(/^[A-Za-z\s]+$/i) >= 0) {

     // this.name = row;

    } else {

      // store all the extra text 
      this.otherInfo = this.otherInfo + row+ " \n ";

    }



  })


 console.log(`Full Name = ${ this.name }`);
 console.log(`Phone = ${ this.phoneNumber }`);
 console.log(`Email = ${ this.email }`);
 console.log(`Extra Text = ${ this.companyName }`);
 console.log(`Extra Text = ${ this.otherInfo }`);

 this.value = "style='width: 100%'";

 this.TextExtractionStatus=" Text reading is complete. Please review and make changes as neccessary....";

 this.showSpinner = false;
 
}

getClassName():string
{
  return (!this.allowCamera)?"btn cameraOpen":" btn  cameraClose";
}

}
