export interface Set {
  id: string;
  code: string;
  name: string;
  release_date: string;
  icon_uri: string;
}

// define a constructor for an empty Set object
export class Set implements Set {
  constructor() {
    this.id = "";
    this.code = "";
    this.name = "";
    this.release_date = "";
    this.icon_uri = "";
  }
}
