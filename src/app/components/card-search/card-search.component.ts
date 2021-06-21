import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';

import { Card } from '../../models/card.model';
import { ScryfallService } from '../../services/scryfall.service';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {
  cards: Card[] = []; // holds the Card objects that were returned from the search
  selectedCard: Card;
  // raw_output$: Observable<JSON>;
  card_name: string;
  detailOpen = false;
  private searchTerms = new Subject<string>();

  constructor(
    private scryfallService: ScryfallService,
    private setService: SetService
    ) { }

  // Push a search term into the observable stream
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  // called when user clicks a card in the search result list. selects that card to display details
  selectCard(card: Card): void {
    this.selectedCard = card;
    this.detailOpen = true;
  }

  // called when user clicks button to go back to search results from the card detail view
  // note the selectedCard still has the details of the last card that was clicked
  closeDetail(): void {
    this.detailOpen = false;
  }

  search(term: string): void {
    this.cards = []; // empty cards array
    this.scryfallService.searchCards(term)
      .pipe(map(resp => {
        let cardArray = <Card[]>[];
        resp.data.forEach(x => {cardArray.push(this.parseJSONtoCards(x))});
        return cardArray;
      }))
      .subscribe(resp => {
        this.cards = resp;
      });
  }

  // Parse a JSON array of cards from Scryfall into an array of Card objects
  parseJSONtoCards(cardData: any): Card {
    return <Card> {
      id: cardData.id,
      name: cardData.name,
      set_code: cardData.set,
      isFullArt: cardData.full_art,
      image_uri: cardData.image_uris.png,
      cmc: cardData.cmc,
      colors: cardData.colors,
      layout: cardData.layout,
      mana_cost: cardData.mana_cost,
      type: this.getType(cardData.type_line),
      subtype: this.getSubtype(cardData.type_line),
      rarity: cardData.rarity,
      oracle_text: cardData.oracle_text, // TODO: this doesn't come out formatted - see Fabled Hero
      price: cardData.prices.usd,
      flavor_name: cardData.flavor_name,
      flavor_text: cardData.flavor_text,
      frame_effects: cardData.frame_effects
    }
    // TODO: card_faces

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
    return split_type[1] ? split_type[1] : "";
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
