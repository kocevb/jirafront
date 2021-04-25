import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { TFM } from 'src/tfm';
import { EditticketComponent } from './ticketlist/editticket/editticket.component';
import { EditstatusComponent } from './ticketlist/editstatus/editstatus.component';


@NgModule({
  declarations: [AppComponent, EditticketComponent, EditstatusComponent],
  entryComponents: [EditticketComponent, EditstatusComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, TFM],
  bootstrap: [AppComponent],
})
export class AppModule { }

