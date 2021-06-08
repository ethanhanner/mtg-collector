import { Component, OnInit } from '@angular/core';

import { saveAs } from 'file-saver';
import { ScryfallService } from '../../services/scryfall.service';

import { Set } from '../../models/set.model';

@Component({
  selector: 'app-set-symbol-download',
  templateUrl: './set-symbol-download.component.html',
  styleUrls: ['./set-symbol-download.component.scss']
})
export class SetSymbolDownloadComponent implements OnInit {
  setIconUri: string;
  sets$: Set[] = [];

  constructor(private scryfallService: ScryfallService) { }

  ngOnInit(): void {
  }

  getSetIconUri(code: string): void {
    this.scryfallService.searchSets(code)
      .subscribe(resp => this.setIconUri = resp.icon_svg_uri);
  }

  downloadSetIcon() {
    saveAs(this.setIconUri, "_seticon.svg");
  }

  getSets() {
    this.sets$ = [];
    this.scryfallService.getSets()
      .subscribe(resp => this.parseJSONtoSets(resp.data));
  }

  // Parse the JSON result into an array of Set objects
  parseJSONtoSets(setData: any) {
    console.log("setData length = " + setData.length);
    // for(let i = 180; i < 190; i++) {
    //   let nextSet = new Set();
    //   nextSet.code = setData[i].code;
    //   nextSet.name = setData[i].name;
    //   nextSet.release_date = setData[i].released_at;
    //   nextSet.icon_uri = setData[i].icon_svg_uri;
    //   this.sets$.push(nextSet);
    // }
    for(let i = 0; i < setData.length; i++) {
      let nextSet = new Set();
      nextSet.code = setData[i].code;
      nextSet.name = setData[i].name;
      nextSet.release_date = setData[i].released_at;
      nextSet.icon_uri = setData[i].icon_svg_uri;
      this.sets$.push(nextSet);
    }
    console.log("sets$ length = " + this.sets$.length);
  }

  // Download the set svgs
  downloadSetIconSvgs(start: any, end: any) {
    var x = Number(start);
    var y = Number(end);
    for(let i = x; i < y; i++) {
      let fileName = this.sets$[i].code + ".svg";
      saveAs(this.sets$[i].icon_uri, fileName);
    }
  }

}
