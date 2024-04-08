import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  url="http://127.0.0.1:3000/expense";
  constructor(private http:HttpClient) { }


  expense(data:any){
    return this.http.post(this.url,data);
  }
}
