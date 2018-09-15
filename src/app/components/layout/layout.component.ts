import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    let date = new Date();
    date.setTime(date.getTime() - 1000);
    document.cookie = 'logintime=0;expires=' + date.toUTCString();
    this.router.navigate(['login']);
  }

}
