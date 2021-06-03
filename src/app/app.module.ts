import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { SetSymbolDownloadComponent } from './set-symbol-download/set-symbol-download.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailComponent,
    CardsListComponent,
    CardSearchComponent,
    SetSymbolDownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
