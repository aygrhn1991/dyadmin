import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  isVisible_add = false;
  isVisible_edit = false;
  data_add: any = {};
  data_edit: any = {};


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
    this.http.get('/admin/querytypescount').subscribe((data: any) => {
      this.loading = false;
      this.total = data;
    });
    this.http.get('/admin/querytypes/' + this.pageIndex + '/' + this.pageSize).subscribe((data: any) => {
      this.loading = false;
      this.dataSet = data;
    });
  }
  showModal_add(): void {
    this.isVisible_add = true;
  }
  showModal_edit(e): void {
    this.isVisible_edit = true;
    this.data_edit = e;
  }
  handleOk_add(): void {
    this.http.post('/admin/addtype', this.data_add).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.isVisible_add = false;
        this.searchData(true);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  handleOk_edit(): void {
    console.log(this.data_edit);
    this.http.post('/admin/edittype', this.data_edit).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.isVisible_edit = false;
        this.searchData(true);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  delete(e): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定删除 ' + e.t_type_name + ' ?',
      nzOnOk: () => {
        this.http.get('/admin/deletetype/' + e.t_id).subscribe((data: any) => {
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


}
