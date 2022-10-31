import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../../shared/models/products';
import { cartProducts } from '../../../shared/models/cartProducts';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: Products[] = [];
  categories: string[] = [];
  cartProducts: cartProducts[] = [];
  isLoading: boolean = true;

  constructor(private ProductsService: ProductsService) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    return this.ProductsService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
  }
  getAllCategories() {
    return this.ProductsService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
  }
  getProductByCategory(event: any) {
    if (event.target.value === 'All') {
      return this.getAllProducts();
    } else {
      return this.ProductsService.getProductByCategory(
        event.target.value
      ).subscribe(
        (data: any) => {
          this.products = data;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = true;
        }
      );
    }
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.some(
        (item: any) => item.item.id === event.item.id
      );
      if (!exist) {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      } else {
        let index = this.cartProducts.findIndex(
          (element: any) => element.item.id === event.item.id
        );
        this.cartProducts[index].quantity = event.quantity;
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));

        alert(
          'This product is already exist but modified quantity to ' +
            event.quantity
        );
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
