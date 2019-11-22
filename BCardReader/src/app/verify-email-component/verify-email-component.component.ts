import { Component, OnInit } from '@angular/core';
import { BCardAuthServiceService } from '../bcard-auth-service.service';

@Component({
  selector: 'app-verify-email-component',
  templateUrl: './verify-email-component.component.html',
  styleUrls: ['./verify-email-component.component.css']
})
export class VerifyEmailComponentComponent implements OnInit {

  constructor(public authService: BCardAuthServiceService) { }

  ngOnInit() {
  }

}
