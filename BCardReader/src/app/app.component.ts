import { Component, OnInit } from '@angular/core';
import { BCardServicesService } from './bcard-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'BCardReader';

  constructor(private bCardService:BCardServicesService)
  {

  }
  ngOnInit(): void {
    console.log(`reset login?${this.bCardService.isLoggedIn} `)
    this.bCardService.setLoggedIn(false);
  }
}
