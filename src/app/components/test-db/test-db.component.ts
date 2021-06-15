/* THIS COMPONENT IS FOR TESTING DIFFERENT STUFF IN THE DATABASE, NOT FOR THE FINAL PROJECT */

import { Component, OnInit } from '@angular/core';

import { Card } from '../../models/card.model';

import { ScryfallService } from '../../services/scryfall.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-test-db',
  templateUrl: './test-db.component.html',
  styleUrls: ['./test-db.component.scss']
})
export class TestDbComponent implements OnInit {
  cards: Card[] = []; // holds the Card objects returned from the search

  constructor(
    private scryfallService: ScryfallService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
  }

  search(term: string) {
    this.cards = []; // empty cards array
    this.scryfallService.searchCards(term)
      .subscribe(response => this.parseJSONtoCards(response.data));
  }

  // Parse a JSON array of cards from Scryfall into an array of Card objects
  parseJSONtoCards(cardData: any) {
    console.log("number of cards returned from scryfall: " + cardData.length);
    for(let i = 0; i < cardData.length; i++) {
      let nextCard = new Card();
      console.log(`card #${i}: name = ${cardData[i].name}, id = ${cardData[i].id}`);
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
      console.log("info on nextCard:");
      console.log(nextCard);
      console.log("");
      console.log("");
      this.cards.push(nextCard);
      // TODO: card_faces
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

  // Add a Card to the database
  // @param { Card } card - the card to add to the database
  addCardToDB(card: Card) {
    this.cardService.create(card)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log("error saving " + card.name + " to the database");
          console.log(error);
        }
      );
  }
}
