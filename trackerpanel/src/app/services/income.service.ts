import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  url="http://127.0.0.1:3000/income";
  constructor(private http:HttpClient) { }


  income(data:any){
    return this.http.post(this.url,data);
}
}
