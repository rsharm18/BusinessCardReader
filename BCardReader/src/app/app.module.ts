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
import { environment } from 'src/environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {  AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessCardSearchComponentComponent } from './business-card-search-component/business-card-search-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessCardComponent,
    BusinessCardsComponent,
    LoginComponent,
    NotFoundComponent,
    NewBusinessCardComponentComponent,
    WebcamComponentComponent,
    BusinessCardSearchComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
