import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://127.0.0.1:3000/login";
  constructor(private http:HttpClient) { }


  loginUser(data: any) {
    const user = {
        email: data.email,
        password: data.password
    };
    return this.http.post(this.url, user);
}
}
