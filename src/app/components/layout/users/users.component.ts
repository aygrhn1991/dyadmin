import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;

  constructor(private http: HttpserviceService, private message: NzMessageService, private modalService: NzModalService) {
  }
  ngOnInit(): void {
    this.searchData();
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.http.get('/admin/queryuserscount').subscribe((data: any) => {
      this.loading = false;
      this.total = data;
    });
    this.http.get('/admin/queryusers/' + this.pageIndex + '/' + this.pageSize).subscribe((data: any) => {
      this.loading = false;
      this.dataSet = data;
    });
  }
  delete(e): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定删除 ' + e.w_nickname + ' ?',
      nzOnOk: () => {
        this.http.get('/admin/deleteuser/' + e.t_id).subscribe((data: any) => {
          if (data == true) {
            this.message.create('success', '操作成功');
            this.searchData(true);
          } else {
            this.message.create('error', '操作失败');
          }
        });
      }
    });
  }


  isVisible_question = false;
  questionList: any = [];
  showModal_question(data): void {
    this.isVisible_question = true;
    this.http.get('/admin/queryallquestions/' + data.t_id).subscribe((data: any) => {
      this.questionList = data;
    });
  }

}
