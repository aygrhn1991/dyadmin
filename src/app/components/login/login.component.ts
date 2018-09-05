import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private routeInfo: ActivatedRoute,private location:Location) { }

  ngOnInit() {
    console.log(this.location.path());
    console.log(this.routeInfo.snapshot.paramMap.get('id'));
  }

}
