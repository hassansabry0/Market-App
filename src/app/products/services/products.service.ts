import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseApi}products`);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseApi}products/categories`);
  }
  getProductByCategory(keyword: string): Observable<any> {
    return this.http.get(`${environment.baseApi}products/category/${keyword}`);
  }
  getProductDetails(id: number): Observable<any> {
    return this.http.get(`${environment.baseApi}products/${id}`);
  }
}
