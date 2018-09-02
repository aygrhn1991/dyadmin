import { Component, OnInit, ViewChild } from '@angular/core';
import { TypecompComponent } from '../../common/typecomp/typecomp.component';
import { DatecompComponent } from '../../common/datecomp/datecomp.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  content;
  ckeConfig;
  data_model={};
  @ViewChild('typeComp') typeComp: TypecompComponent;
  @ViewChild('dateComp') dateComp: DatecompComponent;

  constructor() { }

  ngOnInit() {
  }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";

  }
  save(): void {
    console.log(this.content);
  }
}
