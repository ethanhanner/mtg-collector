import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
  baseIconUri = "http://localhost:8080/set_icons/"
  sets: Set[] = [];
  message = "";

  constructor(
    private scryfallService: ScryfallService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  getSetIconUri(code: string): void {
    this.scryfallService.searchSets(code)
      .subscribe(resp => this.setIconUri = resp.icon_svg_uri);
  }

  getSets() {
    this.sets = [];
    this.scryfallService.getSets()
      .subscribe(resp => this.parseJSONtoSets(resp.data));
  }

  checkIfFileExists(code: string) {
    if(!code) {
      this.message = "Please enter a set code.";
      return;
    }
    let fileExists = false;
    this.iconFileExists(code)
      .subscribe(resp => this.message = `${code}.svg exists? ${resp}`);
  }

  // Takes in setData (JSON). Checks if there is already an icon file for the set
  // (named <set code>.svg). If there is, do nothing. If there isn't, download the set icon.
  processSets(setData: any) {
    var code = "";
    var fileExists = false;
    for(let i = 0; i < setData.length; i++) {
      code = setData[i].code;
      this.iconFileExists(code)
        .subscribe(resp => fileExists = resp);
      if(!fileExists) {
        this.downloadIconSvg(setData[i].icon_svg_uri, code);
      }
    }
  }



  // Download the set icon.
  // @param {string} url - the url of the file icon to download (this should be a remote server)
  // @param {string} code - the code of the set to download the icon of
  downloadIconSvg(url: string, code: string) {
    saveAs(url, code + ".svg");
  }

  // check if there is already an icon saved for this set code
  iconFileExists(code: string): Observable<boolean> {
    let iconFileName = this.baseIconUri + code + ".svg";
    console.log(iconFileName);
    return this.http.get(iconFileName)
      .pipe(
        map(response => {
          console.log(response);
          return true;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  // Parse the JSON result into an array of Set objects
  parseJSONtoSets(setData: any) {
    console.log("setData length = " + setData.length);
    for(let i = 0; i < setData.length; i++) {
      let nextSet = new Set();
      nextSet.code = setData[i].code;
      nextSet.name = setData[i].name;
      nextSet.release_date = setData[i].released_at;
      nextSet.icon_uri = setData[i].icon_svg_uri;
      this.sets.push(nextSet);
    }
    console.log("sets$ length = " + this.sets.length);
  }

  // Download the set svgs
  downloadSetIconSvgs(start: any, end: any) {
    var x = Number(start);
    var y = Number(end);
    for(let i = x; i < y; i++) {
      saveAs(this.sets[i].icon_uri, this.sets[i].code + ".svg");
    }
  }

}
