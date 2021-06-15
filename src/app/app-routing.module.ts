import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardSearchComponent } from './components/card-search/card-search.component';

// TIED TO DATABASE BACKEND API
import { SetDetailsComponent } from './components/set-details/set-details.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { AddSetComponent } from './components/add-set/add-set.component';
import { SetSymbolDownloadComponent } from './components/set-symbol-download/set-symbol-download.component';
import { BuildSetTableComponent } from './components/build-set-table/build-set-table.component';
import { TestDbComponent } from './components/test-db/test-db.component';


const routes: Routes = [
  { path: '', redirectTo: '/card-search', pathMatch: 'full' },
  { path: 'card-search', component: CardSearchComponent },
  { path: 'sets', component: SetListComponent },
  { path: 'sets/:code', component: SetDetailsComponent },
  { path: 'add-set', component: AddSetComponent },
  { path: 'download-set-icons', component: SetSymbolDownloadComponent },
  { path: 'build-set-table', component: BuildSetTableComponent },
  { path: 'test-db', component: TestDbComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
