import { Component, OnInit } from '@angular/core';

import { Set } from 'src/app/models/set.model';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})

export class SetListComponent implements OnInit {
  sets ?: Set[];
  currentSet ?: Set;
  currentIndex = -1;
  code = '';

  constructor(private setService: SetService) { }

  ngOnInit(): void {
    this.retrieveSets();
  }

  // get all Sets from the database
  retrieveSets(): void {
    this.setService.getAll()
      .subscribe(
        data => {
          this.sets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  // refresh the list of Sets from the database and reset the currentSet
  refreshList(): void {
    this.retrieveSets();
    this.currentSet = undefined;
    this.currentIndex = -1;
  }

  // set currentSet
  setActiveSet(set: Set, index: number): void {
    this.currentSet = set;
    this.currentIndex = index;
  }

  // remove all the Sets from the database table
  removeAllSets(): void {
    this.setService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      );
  }

  // search the database for a Set with the same code as this.code
  searchByCode(): void {
    this.setService.get(this.code)
      .subscribe(
        data => {
          this.sets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

}
