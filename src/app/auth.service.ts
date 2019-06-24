import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User[]> {
    let userid = localStorage.getItem("USER_ID")
    let token = localStorage.getItem("ACCESS_TOKEN")
    return this.http.get<User[]>(`${this._apiurl}/users/${userid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
        }
    });
  }

  public updateUser(userInfo: User) {
    let userid = localStorage.getItem("USER_ID")
    let token = localStorage.getItem("ACCESS_TOKEN")

    return this.http.patch(`${this._apiurl}/users/${userid}`, userInfo, {
      headers: {
        'content-type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });
  }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }


  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
    localStorage.removeItem('currentuser');
  }


}
