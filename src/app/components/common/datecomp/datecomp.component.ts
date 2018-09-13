import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datecomp',
  templateUrl: './datecomp.component.html',
  styleUrls: ['./datecomp.component.css']
})
export class DatecompComponent implements OnInit {
  date: Date = new Date();
  constructor() { }
  ngOnInit() {
  }
  onChange(result: Date): void { }

}
