import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mainUrl: string = 'http://localhost:3000/auth';
  constructor(private httpClient: HttpClient) { }
  
  login(request:User){
    return this.httpClient.post(`${this.mainUrl}/login`, request,  {responseType: 'json'});
  }
  register(request: User){
    return this.httpClient.post(`${this.mainUrl}/signup`, request,  {responseType: 'json'});

  }
  public isAuthenticated(): boolean {
     if( sessionStorage.getItem('userLoggedRegistered')) {
       return true;
     }
     else{
      return  false;

     }

}
}
