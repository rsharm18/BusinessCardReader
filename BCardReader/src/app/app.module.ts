import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NewBusinessCardComponentComponent } from './new-business-card-component/new-business-card-component.component';
import {WebcamModule} from 'ngx-webcam';
import { WebcamComponentComponent } from './webcam-component/webcam-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessCardComponent,
    BusinessCardsComponent,
    LoginComponent,
    NotFoundComponent,
    NewBusinessCardComponentComponent,
    WebcamComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
