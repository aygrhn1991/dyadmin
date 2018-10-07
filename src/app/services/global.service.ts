import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  webServer: string = 'http://dy.ljwenyi.com/dy';
  fileServer: string = 'http://dy.ljwenyi.com/dyfile';
  constructor() { }
}
