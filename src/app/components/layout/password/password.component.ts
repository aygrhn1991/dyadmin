import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  oldpassword: string = '';
  newpassword: string = '';
  confirmpassword: string = '';
  constructor(private http: HttpserviceService, private message: NzMessageService) { }

  ngOnInit() {
  }

  save(): void {
    if (this.newpassword != this.confirmpassword) {
      this.message.create('error', '新密码不一致');
      return;
    }
    this.http.get('/admin/changepassword/' + this.oldpassword + '/' + this.newpassword).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
      } else {
        this.message.create('error', '操作失败');
      }
      this.oldpassword = '';
      this.newpassword = '';
      this.confirmpassword = '';
    });
  }

}
