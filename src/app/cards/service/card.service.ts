import { Injectable } from '@angular/core';
import { Tester } from 'src/entities/Tester';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor() {
  }

  getCards(){
    return Tester.WarsawTransAir.employees.toArray().sort((a,b) => a.id - b.id );
  }
}
