import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardSearchComponent } from './components/card-search/card-search.component';

// TIED TO DATABASE BACKEND API
import { SetDetailsComponent } from './components/set-details/set-details.component';
import { SetListComponent } from './components/set-list/set-list.component';
import { AddSetComponent } from './components/add-set/add-set.component';


const routes: Routes = [
  { path: '', redirectTo: '/card-search', pathMatch: 'full' },
  { path: 'card-search', component: CardSearchComponent },
  { path: 'sets', component: SetListComponent },
  { path: 'sets/:code', component: SetDetailsComponent },
  { path: 'add-set', component: AddSetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
