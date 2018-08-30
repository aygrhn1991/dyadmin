import { Component, OnInit ,ViewChild } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  constructor() {
    this.mycontent = `<p>My html content</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      image_previewText:' ',
      // 文件上传路径
      filebrowserUploadUrl :`/api-admin/admin/public/flashUpload`,
      // 图片上传后端url
      filebrowserImageUploadUrl:'http://localhost:8080/home/imageUpload',
      // flash上传后端url
      filebrowserFlashUploadUrl:`/api-admin/admin/public/flashUpload`,
      // audio上传url
      filebrowserAudioUploadUrl:`/api-admin/admin/public/flashUpload`,
  };
  
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";

  }
  show():void{
    console.log(this.mycontent);
  }
}
