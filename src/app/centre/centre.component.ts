import { CentreService } from './service/centre.service';
import { Component, OnInit } from '@angular/core';
import { Centre } from 'src/entities/Centre';

@Component({
  selector: 'centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css']
})
export class CentreComponent implements OnInit {

  centre: Centre;

  constructor(service: CentreService) {
    this.centre = service.getCentre();
   }

  ngOnInit(): void {
  }

}
