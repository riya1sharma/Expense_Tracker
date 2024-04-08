import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url="http://127.0.0.1:3000/register";
  constructor(private http:HttpClient) { }


  registerUser(data:any){
    return this.http.post(this.url,data);
  }
}
