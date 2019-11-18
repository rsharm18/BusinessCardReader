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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBusinessCardComponentComponent implements OnChanges,OnInit {

  @Input() bCard:BusinessCardDataModel;
  @Input() curindex:number;
  @Output() onSaveBCard:EventEmitter<{bCard:BusinessCardDataModel,index:number,isNew:boolean}>;

  
   name:string;
   emailID:string;
   orgName:string;
   otherNotes:string
   phone:string

   allowCamera:boolean;
   
  files:File;
  base64Image:string = ""
  imagePath:SafeHtml;
   showImage:boolean = false;

  private editMode:boolean=false;
  
  constructor(public bCardSerivces:BCardServicesService,private _sanitizer: DomSanitizer, private http: HttpClient) {
    this.onSaveBCard = new EventEmitter();
   }

  ngOnInit() {
    console.log(`input in the new component ${this.bCard}`);

    console.log(` ****************** input in the new component ${this.bCard} ******************`);

    // this.imagePath = "../../assets/no-image-found.jpg";

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
   // console.log(`cusIndex ${this.curindex} ${JSON.stringify(this.bCard)}`);

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
      "imageurl"    : this.base64Image?this.base64Image: "../../assets/no-image-found.jpg",
      "userId"      : this.bCardSerivces.username?this.bCardSerivces.username:"ravi" , 
      "otherInfo"   : this.otherNotes,  
      "phoneNumber" : this.phone
      }

    //let bCard:BusinessCardDataModel =  new BusinessCardDataModel(obj)
    
    this.onSaveBCard.emit({bCard:obj,index:this.curindex,isNew:!this.editMode});
    
  }

  saveReset()
  {
      console.log("clicked on Reste")
      this.name = ""
      this.emailID  =""
      this.orgName = ""
      this.base64Image="";
      this.imagePath="../../assets/no-image-found.jpg";
      this.otherNotes="";
      this.phone="";

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
    this.setImage(this.base64Image)

   
    
    this.readTextFromImage();

    $("#bcImg").attr("src", 'data:image/jpg;base64,'+ this.base64Image);
    console.log(`imagePath ${this.imagePath}`)

    console.log(` ******************* this.base64Image ${this.base64Image} !!!!!!!!!!~~@@@************88`)
    //console.log("generated the base64Image "+this.base64Image+"\n **************")
    //document.getElementById("imgDiv").setAttribute("src",this.imagePath);
    //document.getElementById("imgDiv").style.display="block";
}


setImage(b64String:string)
{
  this.base64Image=b64String;

  this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.base64Image);
  console.log( `b64String : ${b64String}`)
  this.readTextFromImage();
}


readTextFromImage()
{

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

      //console.log(` description : ${data["responses"][0]["textAnnotations"][0]["description"]}`)
      this.parseData(data.toString());
    })

}



parseData(data: string) {



  //console.log(`data = ${data}`);



  // initialize the values to remove old data if still present 

  this.name=""
  this.phone = '';
  this.emailID = "";
  this.orgName = "";
  this.otherNotes = "";

  var data1 = data.split('\n');



  data1.forEach(row => {

    //console.log(`data2 = ${ data2 }`);

    //console.log(`data2 is index = ${ data2.search(/@/i) }`);



    if(row.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) >= 0) {

      // check for email 

      //console.log(`data2 is email = ${ data2 }`);

      this.emailID = row;

    }

    else if(row.toUpperCase().indexOf("PHONE")>-1 || row.toUpperCase().indexOf("MOBILE")>-1 || row.search(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/) >= 0) {

      // check for phone number 

      //console.log(`data2 is phone = ${ data2 }`);

      row = row.toUpperCase();
      console.log(`${row.indexOf("PHONE")} ${row.indexOf("MOBILE")} ${row.indexOf(":")}`)
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

      this.phone = row;

    } else if(row.search(/^[A-Za-z\s]+$/i) >= 0) {

      this.name = row;

    } else {

      // store all the extra text 
      this.otherNotes = this.otherNotes + row+ " \n ";

    }



  })




  

  console.log(`Full Name = ${ this.name }`);

  

  console.log(`Phone = ${ this.phone }`);

  console.log(`Email = ${ this.emailID }`);

  console.log(`Extra Text = ${ this.orgName }`);

  console.log(`Extra Text = ${ this.otherNotes }`);

  



}


}
