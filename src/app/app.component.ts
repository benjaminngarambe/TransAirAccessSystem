import { Tester } from 'src/entities/Tester';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'transair';

  constructor(){
    Tester.initialize();
  }
}
