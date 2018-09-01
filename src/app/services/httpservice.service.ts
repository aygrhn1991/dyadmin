import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  public get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  public post(url: string, options: any) {
    return this.http.post(this.baseUrl + url, options);
  }
}
