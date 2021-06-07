import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SetService } from 'src/app/services/set.service';
import { Set } from 'src/app/models/set.model';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.scss']
})
export class SetDetailsComponent implements OnInit {
  currentSet = new Set();
  message = '';

  constructor(
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getSet(this.route.snapshot.params.code);
  }

  // call on init: get the set matching the code in the URL from the database
  getSet(code: string): void {
    this.setService.get(code)
      .subscribe(
        data => {
          this.currentSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  // update the set's details in the database
  updateSet(): void {
    this.setService.update(this.currentSet.code, this.currentSet)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        }
      );
  }

  // delete the set from the database, then go back to the set list view
  deleteSet(): void {
    this.setService.delete(this.currentSet.code)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/sets']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
