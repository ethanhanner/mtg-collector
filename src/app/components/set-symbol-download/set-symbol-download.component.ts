import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { saveAs } from 'file-saver';

import { ScryfallService } from '../../services/scryfall.service';

import { Set } from '../../models/set.model';
import { exitCode } from 'process';

// TODO: this is probably something that should be handled on the backend server
// i can use the file system functions there and save the icons where I actually want them
@Component({
  selector: 'app-set-symbol-download',
  templateUrl: './set-symbol-download.component.html',
  styleUrls: ['./set-symbol-download.component.scss']
})
export class SetSymbolDownloadComponent implements OnInit {
  setIconUri: string;
  baseIconUri = "http://localhost:8080/set_icons/";
  setData: any;
  message = "";

  constructor(
    private scryfallService: ScryfallService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.setData = undefined;
  }

  getSetIconUri(code: string): void {
    this.scryfallService.searchSets(code)
      .subscribe(resp => this.setIconUri = resp.icon_svg_uri);
  }

  // Get the Set data from Scryfall.
  // https://scryfall.com/docs/api/sets
  getSetData() {
    this.setData = undefined;
    this.scryfallService.getSets()
      .subscribe(resp => this.setData = resp.data);
  }

  // Takes in setData (JSON). Checks if there is already an icon file for the set
  // (named <set code>.svg). If there is, do nothing, If there isn't, download the set icon.
  //
  // **** IMPORTANT: assumes that getSets() has already been called and there is data in setData
  downloadMissingSetIcons() {
    // TODO: this isn't waiting for each iteration of the for loop to complete
    // i keep getting the same file name output in the console log statements, and when
    // there is a missing icon it doesn't actually get downloaded because the execution
    // moves on too quickly
    var code = "";
    var fileExists = false;
    for(let i = 0; i < this.setData.length; i++) {
      code = this.setData[i].code;
      this.doesIconFileExist(code)
        .subscribe(resp => {
          if(!resp) {
            console.log(`${code}.svg does not exist yet.`);
            this.downloadIconSvg(this.setData[i].icon_svg_uri, code);
          } else {
            console.log(`${code}.svg already exists.`);
          }
        });
    }
  }

  // Download an individual set icon.
  // @param {string} url - the url where the icon can be downloaded from
  // @param {string} code - the code of the set
  downloadIconSvg(url: string, code: string) {
    saveAs(url, code + ".svg");
  }

  // Search for a set on Scryfall and download its icon
  // @param {string} code - the set code to search for
  getSetIcon(code: string) {
    this.scryfallService.searchSets(code)
      .subscribe(resp => {
        this.downloadIconSvg(resp.icon_svg_uri, code);
      });
  }

  // Check if the server already has a file icon for this set
  // @param {string} code - the code of the set
  doesIconFileExist(code: string): Observable<boolean> {
    let iconFileName = this.baseIconUri + code + ".svg";
    console.log(iconFileName);
    return this.http.get(iconFileName, { observe: 'response', responseType: 'blob'})
      .pipe(
        map(response => {
          // console.log(response.status);
          return true;
        }),
        catchError(error => {
          // console.log(error);
          return of(false);
        })
      );
  }

  // Download the set svgs. For some reason this only works in increments of 10,
  // which is the reason for a start and end index.
  // **** IMPORTANT: assumes getSetData() has already been called
  //
  // @param {any | number} start - index to start at in the setData
  // @param {any | number} end - index to end at in the setData
  downloadSetIconSvgs(start: any, end: any) {
    var x = Number(start);
    var y = Number(end);
    for(let i = x; i < y; i++) {
      saveAs(this.setData[i].icon_svg_uri, this.setData[i].code + ".svg");
    }
  }

  // quick check to see if an icon file exists, used during testing
  checkIfFileExists(code: string) {
    if(!code) {
      this.message = "Please enter a set code.";
      return;
    }

    this.doesIconFileExist(code)
      .subscribe(resp => this.message = `${code}.svg exists? ${resp}`);
  }

}
