import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit, OnChanges {

  storedLog:string = "";
  @Input() newLog: string;

  constructor() { }

  getLog(){
    return this.storedLog;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.storedLog += this.newLog + "\n";
  }

}
