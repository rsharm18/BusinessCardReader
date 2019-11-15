import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BCardServicesService } from '../bcard-services.service';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {

  constructor(private route:Router, private bCardSerivces:BCardServicesService) { }


  logoutMe()
  {
    console.log("you clicked logout");

    this.bCardSerivces.setLoggedIn(false);
    this.route.navigate(["/login"]);

  }
  ngOnInit() {
  }

}
