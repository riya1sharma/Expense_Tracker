import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url="http://127.0.0.1:3000/todo";
  constructor(private http:HttpClient) { }


  todo(data:any){
    return this.http.post(this.url,data);
}
}
