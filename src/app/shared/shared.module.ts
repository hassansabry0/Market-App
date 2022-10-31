import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SeeMorePipe } from './pipes/see-more.pipe';
import { ProductsModule } from '../products/products.module';
import { SelectCategoriesComponent } from './components/select-categories/select-categories.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SeeMorePipe,
    SelectCategoriesComponent,
    CardComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, AuthModule],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SeeMorePipe,
    SelectCategoriesComponent,
    CardComponent,
    FormsModule,
    SidebarComponent,
  ],
})
export class SharedModule {}
