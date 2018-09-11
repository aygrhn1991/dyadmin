import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  webServer: string = 'http://localhost:4208/dy';
  fileServer: string = 'http://localhost:8000';
  constructor() { }
}