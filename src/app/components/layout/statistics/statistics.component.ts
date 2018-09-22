import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { DaterangecompComponent } from '../../common/daterangecomp/daterangecomp.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  question_count_by_day: any = [];
  dateStrList: any = [];
  dateTimestampList: any = [];

  question_count_by_day_option;

  @ViewChild('daterangeComp') daterangeComp: DaterangecompComponent;

  constructor(private http: HttpserviceService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(): void {
    this.makeDate();
    this.question_count_by_day_fn();
  }

  makeDate(): void {
    this.dateStrList = [];
    this.dateTimestampList = [];
    for (let i = 0; i < this.daterangeComp.days; i++) {
      this.dateStrList.push(this.dateFormat(this.daterangeComp.dateRange[0].getTime() + i * 24 * 60 * 60 * 1000));
      this.dateTimestampList.push(this.daterangeComp.dateRange[0].getTime() + i * 24 * 60 * 60 * 1000);
    }
  }

  question_count_by_day_fn(): void {
    this.question_count_by_day = [];
    this.http.get('/admin/question_count_by_day/' + this.daterangeComp.dateRange[0].getTime() + '/' + this.daterangeComp.dateRange[1].getTime()).subscribe((data: any) => {
      this.dateTimestampList.forEach((e) => {
        let count = data.filter(function (f) {
          return f.t_time >= e && f.t_time < (e + 24 * 60 * 60 * 1000);
        }).length;
        this.question_count_by_day.push(count);
      });
      this.question_count_by_day_option = {
        title: {
          text: '提问数'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%'
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.dateStrList
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'line',
          data: this.question_count_by_day
        }]
      }
    });
  }

  dateFormat(timestamp: number): string {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let newDate = year + '-' + month + '-' + day;
    return newDate;
  }
}
