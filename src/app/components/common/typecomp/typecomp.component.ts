import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../services/httpservice.service';

@Component({
  selector: 'app-typecomp',
  templateUrl: './typecomp.component.html',
  styleUrls: ['./typecomp.component.css']
})
export class TypecompComponent implements OnInit {
  selectedValue: number;
  typeList: any = [];
  constructor(private http: HttpserviceService) { }

  ngOnInit() {
    this.http.get('/admin/queryalltypes/').subscribe((data: any) => {
      this.typeList = data;
    });
  }

}
