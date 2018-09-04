import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { TypecompComponent } from '../../common/typecomp/typecomp.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  isVisible_add = false;
  isVisible_edit = false;
  data_add: any = {};
  data_edit: any = {};

  @ViewChild('typeComp_Add') typeComp_Add: TypecompComponent;
  @ViewChild('typeComp_Edit') typeComp_Edit: TypecompComponent;

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
    this.http.get('/admin/queryquestionscount').subscribe((data: any) => {
      this.loading = false;
      this.total = data;
    });
    this.http.get('/admin/queryquestions/' + this.pageIndex + '/' + this.pageSize).subscribe((data: any) => {
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
    this.typeComp_Edit.selectedValue = this.data_edit.t_type_id;
  }
  handleOk_add(): void {
    this.data_add.t_type_id = this.typeComp_Add.selectedValue;
    this.http.post('/admin/addquestion', this.data_add).subscribe((data: any) => {
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
    this.data_edit.t_type_id = this.typeComp_Edit.selectedValue;
    this.http.post('/admin/editquestion', this.data_edit).subscribe((data: any) => {
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
      nzContent: '确定删除 ' + e.t_title + ' ?',
      nzOnOk: () => {
        this.http.get('/admin/deletequestion/' + e.t_id).subscribe((data: any) => {
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
    this.http.get('/admin/setquestiontop/' + data.t_id + '/' + data.t_top).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData(true);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  setSort(data): void {
    this.http.get('/admin/setquestionsort/' + data.t_id + '/' + data.t_sort).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData(true);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  setScan(data): void {
    this.http.get('/admin/setquestionscan/' + data.t_id + '/' + data.t_scan).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchData(true);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }


  isVisible_answer = false;
  answerList = [];
  temp_qusetion: any = {};
  temp_answer: any = {};
  answerContent: string;
  searchAnswer(id): void {
    this.http.get('/admin/queryallanswers/' + id).subscribe((data: any) => {
      this.answerList = data;
    });
  }
  showModal_answer(data): void {
    this.temp_qusetion = data;
    this.isVisible_answer = true;
    this.searchAnswer(this.temp_qusetion.t_id);
  }
  handleOk_answer(): void {
    this.temp_answer.t_question_id = this.temp_qusetion.t_id;
    this.http.post('/admin/addanswer', this.temp_answer).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.searchAnswer(this.temp_qusetion.t_id);
        this.searchData();
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }
  deleteAnswer(e): void {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确定删除此条消息?',
      nzOnOk: () => {
        this.http.get('/admin/deleteanswer/' + e.t_id).subscribe((data: any) => {
          if (data == true) {
            this.message.create('success', '操作成功');
            this.searchAnswer(this.temp_qusetion.t_id);
          } else {
            this.message.create('error', '操作失败');
          }
        });
      }
    });
  }

  isVisible_user = false;
  temp_user: any = {};
  showModal_user(data): void {
    this.isVisible_user = true;
    this.http.get('/admin/queryuser/' + data.t_user_id).subscribe((data: any) => {
      this.temp_user = data;
    });
  }

}
