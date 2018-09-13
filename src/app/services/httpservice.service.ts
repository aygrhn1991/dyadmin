import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  baseUrl: string = this.global.webServer;

  constructor(private http: HttpClient, private global: GlobalService) { }
  public get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  public post(url: string, options: any) {
    return this.http.post(this.baseUrl + url, options);
  }
}
