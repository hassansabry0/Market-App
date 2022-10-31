import { SharedService } from './../../services/shared.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Products } from '../../models/products';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() product!: Products;
  @Output() item = new EventEmitter();
  count: number = 1;
  addButton: boolean = false;

  constructor(private SharedService: SharedService) {}

  ngOnInit(): void {}

  add() {
    this.item.emit({ item: this.product, quantity: this.count });
    // show length of cart
    this.SharedService.setCount(
      JSON.parse(localStorage.getItem('cart')!)?.length
    );
  }
}
