export interface Set {
  code: string;
  name: string;
  release_date: string;
  icon_uri: string;
}

// define a constructor for an empty Set object
export class Set implements Set {
  constructor() {
    this.code = "";
    this.name = "";
    this.release_date = "";
    this.icon_uri = "";
  }
}
