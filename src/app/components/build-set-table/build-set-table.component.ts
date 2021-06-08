// This component is used to retrieve all sets from the Scryfall database
// and save them to the local database.
// This includes downloading the set icon svg's.

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
  sets$: Set[] = [];

  constructor(
    private scryfallService: ScryfallService,
    private setService: SetService) { }

  ngOnInit(): void {
  }


}
