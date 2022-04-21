import { Injectable } from '@angular/core';
import { Tester } from 'src/entities/Tester';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor() { }

  getZones() {
    return Tester.WarsawTransAir.zones.toArray().sort()
  }
}
