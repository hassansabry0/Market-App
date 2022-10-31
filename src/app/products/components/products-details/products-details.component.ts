import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/models/products';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id!: number;
  data!: Products;
  cartProducts: any[] = [];
  addButton: boolean = false;
  isLoading: boolean = true;
  quantity: number = 1;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.ActivatedRoute.snapshot.paramMap.get('id'));
    this.ProductsService.getProductDetails(this.id).subscribe(
      (data) => {
        this.data = data;

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addToCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item: any) => item.item.id === this.data?.id
      );

      if (!exist) {
        this.cartProducts.push({ item: this.data, quantity: this.quantity });
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        console.log(this.cartProducts);
      } else {
        let index = this.cartProducts.findIndex(
          (element: any) => element.item.id === exist.item.id
        );
        this.cartProducts[index].quantity = this.quantity;
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        alert(
          'This product is already exist but modified quantity to ' +
            this.quantity
        );
      }
    } else {
      this.cartProducts.push({ item: this.data, quantity: this.quantity });
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
