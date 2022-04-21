import { CardService } from './service/card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/entities/Card/Card';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Array<Card>;

  constructor(service: CardService) {
    this.cards = service.getCards();
  }

  ngOnInit(): void {
  }
}
