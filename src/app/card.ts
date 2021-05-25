export interface Card {
  id: string; // scryfall ID (UUID)
  name: string;
  set_id: number; // matches a number id in a database table of sets that I will make eventually
  set_code: string; // three letter code for the set
  set_name: string;
  isFoil: boolean;
  cmc: number; // decimal value
  colors: string[];
  layout: string; // normal, split, modal_dfc, etc
  mana_cost: string;
  type: string; // TODO: split this into type and subtype
  rarity: string;
  oracle_text: string;
  price: number; // tcg mid
  price_date: Date; // the date that the price was last checked
  // TODO: figure out how to store data when it is a card with multiple faces
}

// define a constructor for an empty Card object
export class Card implements Card {
  constructor() {
    this.id = "";
    this.name = "";
    this.set_id = -1;
    this.set_code = "";
    this.set_name = "";
    this.isFoil = false;
    this.cmc = -1;
    this.colors = [];
    this.layout = "";
    this.mana_cost = "";
    this.type = "";
    this.rarity = "";
    this.oracle_text = "";
    this.price = -1;
    this.price_date = new Date();
  }
}
