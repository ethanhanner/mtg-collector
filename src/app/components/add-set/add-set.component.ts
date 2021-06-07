import { Component, OnInit } from '@angular/core';
import { Set } from 'src/app/models/set.model';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.scss']
})

// USES MTG COLLECTOR BACKEND API TO ACCESS THE DATABASE
export class AddSetComponent implements OnInit {
  set = new Set();
  submitted = false;

  constructor(private setService: SetService) { }

  ngOnInit(): void {
  }

  saveSet(): void {
    const data = {
      code: this.set.code,
      name: this.set.name,
      release_date: this.set.release_date,
      icon_uri: this.set.icon_uri
    };

    this.setService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  displaySetForm(): void {
    this.submitted = false;
    this.set = new Set();
  }

}
