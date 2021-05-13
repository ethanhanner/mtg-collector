export interface Card {
  id: number; // scryfall ID (UUID)
  name: string;
  set_id: number; // matches a number id in a database table of sets
  cmc: number; // decimal value
  colors: string[];
  layout: string; // normal, split, modal_dfc, etc
  mana_cost: string;
  type_line: string;
  rarity: string;
  oracle_text: string;
  price: number; // tcg mid
  price_data: Date; // the date that the price was last checked
  // TODO: figure out how to store data when it is a card with multiple faces
}
