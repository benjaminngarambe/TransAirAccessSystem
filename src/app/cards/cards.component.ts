import { CardService } from './service/card.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Card, Role } from 'src/entities/Card/Card';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Array<Card>;
  roles = Object.values(Role).filter(a => typeof a === 'string');

  constructor(service: CardService) {
    this.cards = service.getCards();
    this.cards.filter(a => a.role.toString() == "Manager");
  }

  getFilteredCards(role: string){
    return this.cards.filter(a => this.roles[a.role] == role);
  }

  ngOnInit(): void {
  }
}
