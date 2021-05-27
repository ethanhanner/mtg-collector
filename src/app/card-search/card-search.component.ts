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
  cards$: Card[] = [];
  // raw_output$: Observable<JSON>;
  raw_output: any;
  card_name: string;
  private searchTerms = new Subject<string>();

  constructor(private scryfallService: ScryfallService) { }

  // Push a search term into the observable stream
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  search(term: string): void {
    // this.scryfallService.searchCards(term)
    //   .subscribe(resp => this.raw_output = JSON.stringify(resp, null, 1));

    this.cards$ = []; // empty cards array
    this.scryfallService.searchCards(term)
      .subscribe(resp => this.parseJSONtoCards(resp.data));
  }

  // Parse the JSON result into an array of Card objects
  parseJSONtoCards(cardData: any) {
    for(let i = 0; i < cardData.length; i++) {
      let nextCard = new Card();
      nextCard.id = cardData[i].id;
      nextCard.name = cardData[i].name;
      nextCard.set_id = 1; // placeholder until I make the database
      nextCard.set_code = cardData[i].set;
      nextCard.set_name = cardData[i].set_name;
      nextCard.isFoil = cardData[i].foil;
      nextCard.image_uri = cardData[i].image_uris.png;
      nextCard.cmc = cardData[i].cmc;
      nextCard.colors = cardData[i].colors;
      nextCard.layout = cardData[i].layout;
      nextCard.mana_cost = cardData[i].mana_cost;
      nextCard.type = cardData[i].type_line; // TODO: split this into type and subtype
      nextCard.rarity = cardData[i].rarity;
      nextCard.oracle_text = cardData[i].oracle_text;
      nextCard.price = cardData[i].prices.usd;
      nextCard.price_date = new Date();
      this.cards$.push(nextCard);
    }
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
