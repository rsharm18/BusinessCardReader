import { Component, OnInit } from '@angular/core';
import { BCardServicesService } from '../bcard-services.service';
import { Router } from '@angular/router';
import { BCardAuthServiceService } from '../bcard-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnInit {
  email:string;
  password:string;
  inValidLogin:boolean;
  showInValidLoginMsg :boolean;

  constructor(private bCardService:BCardServicesService, private route:Router, public authService:BCardAuthServiceService)
  {
   this.inValidLogin=true
  }
   checkLog()
   {
    this.inValidLogin=false;

     console.log(`You entered ${this.email} ${this.password}`);
     this.inValidLogin = !this.bCardService.validateUser(this.email,this.password);
     console.log(`invalid login ${this.inValidLogin}`)

     this.showInValidLoginMsg = this.inValidLogin
     
     return false;
     
   }

  ngOnInit() {
    this.showInValidLoginMsg=false;
  }

}
