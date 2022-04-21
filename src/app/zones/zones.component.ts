import { ZonesService } from './service/zones.service';
import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/entities/Zone/Zone';

@Component({
  selector: 'zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: Array<Zone>;

  constructor(service: ZonesService) {
    this.zones = service.getZones();
   }

  ngOnInit(): void {
  }

  getArray(length : number){
    length = length > 0 ? (length > 10 ? 10 : length) : 1;
    return new Array(length);
  }

}