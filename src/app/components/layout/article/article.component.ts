import { Component, OnInit, ViewChild } from '@angular/core';
import { TypecompComponent } from '../../common/typecomp/typecomp.component';
import { DatecompComponent } from '../../common/datecomp/datecomp.component';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpserviceService } from '../../../services/httpservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article_id: number;
  data_model = {
    t_id: null,
    t_type_id: null,
    t_title: null,
    t_author: null,
    t_time: null,
    t_cover: null,
    t_content: null
  };
  imgUrl: string;
  ckeConfig: any;
  webServer:string=this.global.webServer;

  @ViewChild('typeComp') typeComp: TypecompComponent;
  @ViewChild('dateComp') dateComp: DatecompComponent;

  constructor(private message: NzMessageService, private http: HttpserviceService, private routeInfo: ActivatedRoute, private router: Router, private global: GlobalService) { }

  ngOnInit() {
    this.article_id = parseInt(this.routeInfo.snapshot.paramMap.get('id'));
    if (this.article_id != 0) {
      this.http.get('/admin/queryarticle/' + this.article_id).subscribe((data: any) => {
        this.data_model = data;
        this.typeComp.selectedValue = this.data_model.t_type_id;
        this.dateComp.date = new Date(this.data_model.t_time);
        this.imgUrl = this.global.fileServer + '/article/' + this.data_model.t_cover;
      });
    }
    this.ckeConfig = {
      image_previewText: ' ',
      filebrowserImageUploadUrl: this.global.webServer + '/admin/articleContentUpload',
    };
  }

  save(): void {
    this.data_model.t_type_id = this.typeComp.selectedValue;
    this.data_model.t_time = this.dateComp.date.getTime();
    let url = this.article_id == 0 ? '/admin/addarticle' : '/admin/editarticle';
    this.http.post(url, this.data_model).subscribe((data: any) => {
      if (data == true) {
        this.message.create('success', '操作成功');
        this.router.navigate(['/layout/articles']);
      } else {
        this.message.create('error', '操作失败');
      }
    });
  }

  beforeUpload = (file: File) => {
    const isJPGorPNG = ((file.type === 'image/jpeg') || (file.type === 'image/png'));
    if (!isJPGorPNG) {
      this.message.error('请上传JPG或PNG格式图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.message.error('图片大小超过2MB!');
    }
    return isJPGorPNG && isLt2M;
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.data_model.t_cover = info.file.response.path;
      this.imgUrl = this.global.fileServer + '/article/' + this.data_model.t_cover;
    }
  }
}
