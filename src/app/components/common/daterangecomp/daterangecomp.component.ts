import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daterangecomp',
  templateUrl: './daterangecomp.component.html',
  styleUrls: ['./daterangecomp.component.css']
})
export class DaterangecompComponent implements OnInit {

  dateRange = [this.dateCutter(new Date(new Date().setDate(1))), this.dateCutter(new Date())];
  days: number = (this.dateRange[1].getTime() - this.dateRange[0].getTime()) / (24 * 60 * 60 * 1000);

  constructor() { }

  ngOnInit() { }

  onChange(result: Date): void {
    if (this.dateRange.length == 0) {
      this.dateRange = [this.dateCutter(new Date(new Date().setDate(1))), this.dateCutter(new Date())];
    } else {
      this.dateRange = [this.dateCutter(this.dateRange[0]), this.dateCutter(this.dateRange[1])];
    }
    this.days = (this.dateRange[1].getTime() - this.dateRange[0].getTime()) / (24 * 60 * 60 * 1000);
  }

  dateCutter(date: Date): Date {
    let d = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();//此处使用‘/’格式化，因为使用‘-’格式化会出现8：00情况
    return new Date(d);
  }

}
