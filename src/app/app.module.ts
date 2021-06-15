import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CardSearchComponent } from './components/card-search/card-search.component';
import { SetSymbolDownloadComponent } from './components/set-symbol-download/set-symbol-download.component';
import { AddSetComponent } from './components/add-set/add-set.component';
import { SetDetailsComponent } from './components/set-details/set-details.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { BuildSetTableComponent } from './components/build-set-table/build-set-table.component';
import { TestDbComponent } from './components/test-db/test-db.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailComponent,
    CardsListComponent,
    CardSearchComponent,
    SetSymbolDownloadComponent,
    AddSetComponent,
    SetDetailsComponent,
    SetListComponent,
    BuildSetTableComponent,
    TestDbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
