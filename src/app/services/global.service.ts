import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // webServer: string = 'http://dy.ljwenyi.com/dy';
  // fileServer: string = 'http://dy.ljwenyi.com/dyfile/upload';
  webServer: string = 'http://localhost:4208/dy';
  fileServer: string = 'http://localhost:4208/dyfile/upload';
  constructor() { }
}
