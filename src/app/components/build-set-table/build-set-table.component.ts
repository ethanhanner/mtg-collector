/* This component is used to retrieve all sets from the Scryfall database
   and save them to the app's database.
   It is assumed that the set icon SVGs have already been downloaded and are stored
   on the server. The file name for a set icon should be:
   <set code>.svg */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { ScryfallService } from '../../services/scryfall.service';
import { SetService } from '../../services/set.service';

import { Set } from '../../models/set.model';

@Component({
  selector: 'app-build-set-table',
  templateUrl: './build-set-table.component.html',
  styleUrls: ['./build-set-table.component.scss']
})
export class BuildSetTableComponent implements OnInit {
  iconImgBaseUrl = "http://localhost:8080/set_icons/";
  sets: Set[] = [];
  statusMessage = "Click Get Sets to retrieve the sets from Scryfall, then click Save Sets to DB to save them to the app's database";

  constructor(
    private scryfallService: ScryfallService,
    private setService: SetService) { }

  ngOnInit(): void {
  }

  // Get the Set data from Scryfall
  getSetData() {
    this.sets = [];
    this.scryfallService.getSets()
      .subscribe(resp => this.parseJSONtoSets(resp.data));
  }

  // Parse the JSON result from Scryfall into an array of Set objects
  parseJSONtoSets(setData: any) {
    this.statusMessage = `Retrieved ${setData.length} sets from Scryfall.`
    for(let i = 0; i < setData.length; i++) {
      let nextSet = new Set();
      nextSet.code = setData[i].code;
      nextSet.name = setData[i].name;
      nextSet.release_date = setData[i].released_at;

      // this assumes the set icon has already been downloaded and is hosted on the server
      nextSet.icon_uri = this.iconImgBaseUrl + setData[i].code + ".svg";

      this.sets.push(nextSet);
    }
    this.statusMessage += `<br/>${this.sets.length} saved to sets array`;
  }

  // Store Sets in the app's database
  // sets should already be created and filled with the Sets from Scryfall
  // i.e. getSetData() and parseJSONtoSets() should already have been called
  saveSetsToDB() {
    // check if sets is empty; if so, return
    if(!this.sets.length) {
      console.log("Error saving to database: sets array is empty.");
      return;
    }

    for(let i = 0; i < this.sets.length; i++) {
      this.setService.create(this.sets[i])
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log("error saving set with code= " + this.sets[i].code + " to database");
            console.log(error);
          }
        );
    }
    this.statusMessage = "Sets have been saved to the database.";
  }

}
