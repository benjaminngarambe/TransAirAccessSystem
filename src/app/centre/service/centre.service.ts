import { Injectable } from '@angular/core';
import { Tester } from 'src/entities/Tester';

@Injectable({
  providedIn: 'root'
})
export class CentreService {

  constructor() { }

  getCentre(){
    return Tester.WarsawTransAir;
  }
}
