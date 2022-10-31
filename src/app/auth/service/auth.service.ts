import { CartService } from './../../cart/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { Login } from '../models/login';
import { Register } from '../models/register';
import { User } from '../models/user';
import { SharedService } from './../../shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject({
    email: '',
    first_name: '',
    iat: 0,
    last_name: '',
    _id: '',
  });
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token-market')) this.getUserData();
  }
  login(data: Login): Observable<any> {
    return this.http.post(`https://route-egypt-api.herokuapp.com/signin`, data);
  }
  signup(data: Register): Observable<any> {
    return this.http.post(`https://route-egypt-api.herokuapp.com/signup`, data);
  }
  getUserData() {
    this.userData.next(
      jwtDecode(JSON.stringify(localStorage.getItem('token-market')))
    );

    return this.userData.getValue()!;
  }
  getUserCart(id: string): Observable<any> {
    return this.http.get(`https:fakestoreapi.com/carts/user/${id}`);
  }
  logOut() {
    localStorage.removeItem('token-market');
    this.userData.next(null!);
    console.log(this.userData.getValue());
    this.userData != null;
  }
}
