import { Component, OnInit, ViewChild } from '@angular/core';
import { TypecompComponent } from '../../common/typecomp/typecomp.component';
import { DatecompComponent } from '../../common/datecomp/datecomp.component';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  loading = false;
  avatarUrl: string;


  content;
  ckeConfig;
  data_model={};
  @ViewChild('typeComp') typeComp: TypecompComponent;
  @ViewChild('dateComp') dateComp: DatecompComponent;

  constructor(private msg: NzMessageService) { }

  ngOnInit() {
  }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";

  }
  save(): void {
    console.log(this.content);
  }

  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.msg.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, (img: string) => {
      //   this.loading = false;
      //   this.avatarUrl = img;
      // });
    }
  }
}
