import { Component, OnInit } from '@angular/core';
import { BCardAuthServiceService } from '../bcard-auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( public authService: BCardAuthServiceService) { }

  ngOnInit() {
  }

}
