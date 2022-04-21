import { CardService } from './cards/service/card.service';
import { CentreService } from './centre/service/centre.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CentreComponent } from './centre/centre.component';
import { LoggerComponent } from './logger/logger.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CentreComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CardService,
    CentreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
