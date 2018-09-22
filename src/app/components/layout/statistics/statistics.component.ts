import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { DaterangecompComponent } from '../../common/daterangecomp/daterangecomp.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  dateStrList: any = [];
  dateTimestampList: any = [];

  question_count_by_day_all: any = [];
  question_count_by_day_solved: any = [];
  question_count_by_tag: any = [];
  question_count_by_tag_legend: any = [];

  question_count_by_day_option;
  question_count_by_tag_option;

  @ViewChild('daterangeComp') daterangeComp: DaterangecompComponent;

  constructor(private http: HttpserviceService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(): void {
    this.makeDate();
    this.question_count_by_day_fn();
    this.question_count_by_tag_fn();
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
    this.question_count_by_day_all = [];
    this.question_count_by_day_solved = [];
    this.http.get('/admin/question_count_by_day/' + this.daterangeComp.dateRange[0].getTime() + '/' + this.daterangeComp.dateRange[1].getTime()).subscribe((data: any) => {
      this.dateTimestampList.forEach((e) => {
        let count_all = data.filter(function (f) {
          return f.t_time >= e && f.t_time < (e + 24 * 60 * 60 * 1000);
        }).length;
        this.question_count_by_day_all.push(count_all);
        let count_solved = data.filter(function (f) {
          return f.t_time >= e && f.t_time < (e + 24 * 60 * 60 * 1000) && f.t_solved;
        }).length;
        this.question_count_by_day_solved.push(count_solved);
      });
      this.question_count_by_day_option = {
        title: {
          text: '按日期统计提问数'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['提问总数', '已回复数']
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
          name: '提问总数',
          type: 'line',
          areaStyle: {},
          data: this.question_count_by_day_all
        },
        {
          name: '已回复数',
          type: 'line',
          areaStyle: {
            normal: {
              color: '#aed4c2'
            }
          },
          data: this.question_count_by_day_solved
        }]
      };
    });
  }
  question_count_by_tag_fn(): void {
    this.question_count_by_tag = [];
    this.question_count_by_tag_legend = [];
    this.http.get('/admin/question_count_by_tag/' + this.daterangeComp.dateRange[0].getTime() + '/' + this.daterangeComp.dateRange[1].getTime()).subscribe((data: any) => {
      data.forEach((e) => {
        this.question_count_by_tag.push({ value: e.count, name: e.t_tag_name });
        this.question_count_by_tag_legend.push(e.t_tag_name);
      });
      console.log(this.question_count_by_tag);
      console.log(this.question_count_by_tag_legend);
      this.question_count_by_tag_option = {
        title: {
          text: '按关键词统计提问数'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: this.question_count_by_tag_legend
        },
        series: [
          {
            name: '标签',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: this.question_count_by_tag,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
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
