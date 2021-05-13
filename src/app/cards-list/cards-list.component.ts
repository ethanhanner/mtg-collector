import { Component, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  cards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
