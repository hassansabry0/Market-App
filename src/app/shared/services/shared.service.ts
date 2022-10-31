import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private count$ = new BehaviorSubject(
    JSON.parse(localStorage.getItem('cart')!)?.length
  );
  private count = this.count$.asObservable();
  constructor() {}
  getCount() {
    return this.count;
  }
  setCount(value: any) {
    return this.count$.next(value);
  }
}
