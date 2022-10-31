import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './component/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, FormsModule],
  exports: [CartComponent],
})
export class CartModule {}
