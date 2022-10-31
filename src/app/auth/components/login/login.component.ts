import { CartService } from './../../../cart/services/cart.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() email!: string;
  isLoading: boolean = false;
  errorMessage!: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
    ]),
  });
  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private CartService: CartService
  ) {}

  ngOnInit(): void {}

  submitLoginForm(loginForm: FormGroup, event: any) {
    this.isLoading = true;
    if (loginForm.valid) {
      this.AuthService.login(loginForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.message === 'success') {
            // data sent
            this.Router.navigate(['/products']);
            // to save data
            localStorage.setItem('token-market', response.token);

            // to go to profile component
            this.AuthService.getUserData();

            // to change User Icon
            event.path[5].children[2].children[0].children[0].children[0].children[0]?.classList.remove(
              'bi-people'
            );
            event.path[5].children[2].children[0].children[0].children[0].children[0]?.classList.add(
              'bi-people-fill'
            );
            event.path[5].children[0].children[0].children[0].children[2].children[0].children[1]?.classList.remove(
              'remove'
            );
            event.path[5].children[0].children[0].children[0].children[2].children[0].children[1]?.classList.add(
              'add'
            );
          } else {
            // data not sent
            this.errorMessage = response.message;
            console.log(response.message);
          }
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
          this.errorMessage = error.statusText + error.status;
        }
      );
    }
  }
}
