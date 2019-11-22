import { Component, OnInit } from '@angular/core';
import { BCardAuthServiceService } from '../bcard-auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: BCardAuthServiceService) { }

  ngOnInit() {
  }

}
