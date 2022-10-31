import { SharedService } from './../../../shared/services/shared.service';
import { AuthService } from './../../../auth/service/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/shared/models/cartProducts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: cartProducts[] = [];
  total: number = 0;
  sentSuccess: boolean = false;
  sentError: boolean = false;

  constructor(
    private cartService: CartService,
    private AuthService: AuthService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getProductsFromCart();
    this.cartService.cartProducts = this.cartProducts;
    // console.log(this.cartService.cartProducts);
  }
  getTotal() {
    this.total = 0;
    this.cartProducts.forEach((product) => {
      this.total += product.quantity * product.item.price;
    });
  }
  getProductsFromCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotal();
  }

  add(index: number) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getTotal();
  }
  min(index: number): any {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getTotal();
    }
  }
  changeInput(index: number, event: any) {
    if (+event.target.value > 1) {
      this.cartProducts[index].quantity = +event.target.value;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getTotal();
    }
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getTotal();
    this.SharedService.setCount(
      JSON.parse(localStorage.getItem('cart')!)?.length ?? 0
    );
  }

  deleteCart() {
    localStorage.removeItem('cart');
    this.cartProducts.splice(0, this.cartProducts.length);
    this.sentSuccess = false;
    this.SharedService.setCount(
      JSON.parse(localStorage.getItem('cart')!)?.length ?? 0
    );
  }
  addToCart() {
    let cart = this.cartProducts.map((product) => ({
      productId: product.item.id,
      quantity: product.quantity,
    }));
    let model = {
      userId: this.AuthService.userData.getValue()._id,
      date: new Date(),
      products: cart,
    };
    this.cartService.addToCart(model).subscribe(
      (res) => {
        console.log(res);

        this.sentSuccess = true;
      },
      (err) => {
        console.log(err);
        this.sentError = true;
      }
    );
  }
}
