import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient,HttpResponse } from "@angular/common/http";
import {TicketData,ContactData,UserData} from '../model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'https://freshdesk-clone-api.herokuapp.com/';
  constructor(private http: HttpClient) { }

  addUser(user: UserData): Observable<any>{
    return this.http.post<any>(this.API_URL+'register',user);
  }
  
  getUsers(): Observable<any>{
    return this.http.get<any>(this.API_URL+'users');
  }
  loginUser(creds): Observable<any>{
    return this.http.post<any>(this.API_URL+'auth',creds)
  }
  isLoggedIn() {
    if (localStorage.getItem('user-token')) {
      return true;
    }
    return false;
  }
  getAuthorizationToken() {
    return JSON.parse(localStorage.getItem('user-token'));
  }

  logout() {
    localStorage.removeItem('user-token');
  }
}
