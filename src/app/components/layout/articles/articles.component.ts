import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  fileServer = this.global.fileServer;

  constructor(private http: HttpserviceService, private message: NzMessageService, private modalService: NzModalService, private global: GlobalService) {
  }
  ngOnInit(): void {
    this.searchData();
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.http.get('/admin/queryarticlescount').subscribe((data: any) => {
      this.loading = false;
      this.total = data;
    });
    this.http.get('/admin/queryarticles/' + this.pageIndex + '/' + this.pageSize).subscribe((data: any) => {
      this.loading = false;
      this.dataSet = data;
    });
  }
  delete(e): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定删除 ' + e.t_title + ' ?',
      nzOnOk: () => {
        this.http.get('/admin/deletearticle/' + e.t_id).subscribe((data: any) => {
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
  setTop(data): void {
    data.t_top = data.t_top == 1 ? 0 : 1;
    this.http.get('/admin/setarticletop/' + data.t_id + '/' + data.t_top).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData();
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  setSort(data): void {
    this.http.get('/admin/setarticlesort/' + data.t_id + '/' + data.t_sort).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData();
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  setScan(data): void {
    this.http.get('/admin/setarticlescan/' + data.t_id + '/' + data.t_scan).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData();
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }


}
