import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../services/httpservice.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string = '';

  constructor(private http: HttpserviceService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() { }

  login(): void {
    if (this.password == '') {
      this.message.create('error', '请输入密码');
      return;
    }
    this.http.get('/admin/login/' + this.password).subscribe((data: any) => {
      if (data == true) {
        document.cookie = "logintime=" + new Date().getTime();
        this.router.navigate(['layout/questions']);
      } else {
        this.message.create('error', '登陆失败');
      }
    });
  }
}
