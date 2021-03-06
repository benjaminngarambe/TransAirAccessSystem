import { CardService } from './cards/service/card.service';
import { CentreService } from './centre/service/centre.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CentreComponent } from './centre/centre.component';
import { LoggerComponent } from './logger/logger.component';
import { ZonesComponent } from './zones/zones.component';
import { ZonesService } from './zones/service/zones.service';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ZonesComponent,
    CentreComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CardService,
    ZonesService,
    CentreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
