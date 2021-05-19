import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Card } from '../card';
import { ScryfallService } from '../scryfall.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {
  cards$: Observable<Card[]>; // TODO: what is this type? it's returned by scryfallService.searchCards
  // eventually I need to have this be an array of Card[]
  // raw_output$: Observable<JSON>;
  raw_output: any;
  private searchTerms = new Subject<string>();

  constructor(private scryfallService: ScryfallService) { }

  // Push a search term into the observable stream
  search(term: string): void {
    console.log("search called");
    // this.searchTerms.next(term);
    this.scryfallService.searchCards(term)
      .subscribe(resp => this.raw_output = JSON.stringify(resp, null, 1));
  }

  ngOnInit(): void {
    // this.cards$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.scryfallService.searchCards(term))
    // );
  }

}
