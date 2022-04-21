import { CentreService } from './service/centre.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Centre } from 'src/entities/Centre';
import { Card, Role } from 'src/entities/Card/Card';
import { Zone } from 'src/entities/Zone/Zone';

@Component({
  selector: 'centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css']
})
export class CentreComponent implements OnInit {

  centre: Centre;
  zones: Array<Zone>;
  cards;

  //Variables for communication with other components
  newLog: string = "";

  constructor(service: CentreService) {
    this.centre = service.getCentre();
    this.zones = this.centre.zones.toArray().sort();
    this.cards = this.centre.employees.toArray().sort((a,b) => a.id - b.id);
  }

  ngOnInit(): void {
  }

  moveCard(){
    let card = this.cards.find(a => a.id == this.getSelectedCardId());
    let zone : Zone = this.zones.find(a => a.name == this.getSelectedZoneName())!;
    this.newLog = this.centre.moveCard(card, zone);
  }

  getSelectedZoneName(){
    return (<HTMLInputElement>document.getElementById("zoneSelect")).value;
  }

  getSelectedCardId(){
    return +(<HTMLInputElement>document.getElementById("cardSelect")).value;
  }

  getCardRole(){
    let card : Card = this.cards.find(a => a.id == this.getSelectedCardId());
    return `Role: ${Role[card.role]}`;
  }

  getCardLocation(){
    let card : Card = this.cards.find(a => a.id == this.getSelectedCardId());
    return `Location: ${this.centre.findCardLocation(card).name}`;
  }

  getZoneCapacity(){
    let name = this.getSelectedZoneName();
    if(!name || name == "") {return;}
    let zone : Zone = this.zones.find(a => a.name == this.getSelectedZoneName())!;
    let capacity = zone.capacity == Number.MAX_SAFE_INTEGER ? "" : "/" + zone.capacity

    return `Employees in Zone: ${zone.employees.count()}${capacity}`;
  }
}
