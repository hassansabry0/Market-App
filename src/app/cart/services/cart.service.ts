import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartProducts } from 'src/app/shared/models/cartProducts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: cartProducts[] = [];
  constructor(private http: HttpClient) {}
  addToCart(model: object): Observable<any> {
    return this.http.post(environment.baseApi + 'carts', model);
  }
}
