import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Card } from '../../models/card.model';
import { ScryfallService } from '../../services/scryfall.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {
  cards$: Card[] = [];
  selectedCard ?: Card;
  // raw_output$: Observable<JSON>;
  raw_output: any;
  card_name: string;
  private searchTerms = new Subject<string>();

  constructor(private scryfallService: ScryfallService) { }

  // Push a search term into the observable stream
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  // called when user clicks a card in the search result list. selects that card to display details
  selectCard(card: Card): void {
    this.selectedCard = card;
  }

  // called when user clicks button to go back to search results from the card detail view
  closeDetail(): void {
    this.selectedCard = undefined;
  }

  search(term: string): void {
    // this.scryfallService.searchCards(term)
    //   .subscribe(resp => this.raw_output = JSON.stringify(resp, null, 1));

    this.cards$ = []; // empty cards array
    this.scryfallService.searchCards(term)
      .subscribe(resp => this.parseJSONtoCards(resp.data));
  }

  // Parse the JSON result into an array of Card objects
  parseJSONtoCards(cardData: any) {
    let nextCard = new Card();
    for(let i = 0; i < cardData.length; i++) {
      nextCard.id = cardData[i].id;
      nextCard.name = cardData[i].name;
      nextCard.set_code = cardData[i].set;
      nextCard.isFoil = cardData[i].foil;
      nextCard.isFullArt = cardData[i].full_art;
      nextCard.image_uri = cardData[i].image_uris.png;
      nextCard.cmc = cardData[i].cmc;
      nextCard.colors = cardData[i].colors;
      nextCard.layout = cardData[i].layout;
      nextCard.mana_cost = cardData[i].mana_cost;
      nextCard.type = this.getType(cardData[i].type_line);
      nextCard.subtype = this.getSubtype(cardData[i].type_line);
      nextCard.rarity = cardData[i].rarity;
      nextCard.oracle_text = cardData[i].oracle_text;
      nextCard.price = cardData[i].prices.usd;
      nextCard.flavor_name = cardData[i].flavor_name;
      nextCard.flavor_text = cardData[i].flavor_text;
      nextCard.frame_effects = cardData[i].frame_effects;
      // TODO: card_faces
      this.cards$.push(nextCard);
    }
  }

  // pass in a card type line and get just the type
  // e.g. "Creature - Faerie" returns "Creature"
  getType(type_line: string): string {
    var split_type = type_line.split(" - ");
    return split_type[0];
  }

  // pass in a card type line and get just the subtype
  // e.g. "Creature - Faerie" returns "Faerie"
  getSubtype(type_line: string): string {
    var split_type = type_line.split(" - ");
    return split_type[1];
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
