export interface Card {
  id: string; // scryfall ID (UUID)
  name: string;
  set_code: string; // code for the set, matches a set in my database
  isFoil: boolean;
  isFullArt: boolean;
  image_uri: string; // TODO: download and store these myself
  cmc: number; // decimal value
  colors: string[];
  layout: string; // normal, split, modal_dfc, etc
  mana_cost: string;
  type: string;
  subtype: string;
  rarity: string;
  oracle_text: string;
  price: number; // the price will be valid as of the date in updatedAt in the database
  flavor_name: string; // e.g. alternate Godzilla card names from Ikoria
  flavor_text: string;
  frame_effect: string;
  card_faces: number[]; // when layout is not 'normal', card_faces will be an array of 2 integers
                        // corresponding to 2 entries in the card-face table
}

// define a constructor for an empty Card object
export class Card implements Card {
  constructor() {
    this.id = "";
    this.name = "";
    this.set_code = "";
    this.isFoil = false;
    this.isFullArt = false;
    this.image_uri = "";
    this.cmc = -1;
    this.colors = [];
    this.layout = "";
    this.mana_cost = "";
    this.type = "";
    this.subtype = "";
    this.rarity = "";
    this.oracle_text = "";
    this.price = 0;
    this.flavor_name = "";
    this.flavor_text = "";
    this.frame_effect = "";
    this.card_faces = [];
  }
}
