import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage!: string;
  @Output() loginEmail = new EventEmitter();

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required,
    ]),
    last_name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required,
    ]),
    age: new FormControl(null, [
      Validators.min(18),
      Validators.max(80),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
    ]),
  });
  constructor(private AuthService: AuthService, private Router: Router) {}

  ngOnInit(): void {}
  submitRegisterForm(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      console.log(loginForm.value);
      this.AuthService.signup(loginForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.message === 'success') {
            // data sent
            this.loginEmail.emit(loginForm.value.email);

            console.log(response);
            this.errorMessage = 'Please Login';
          } else {
            // data not sent
            this.errorMessage = response.errors.email.message;
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
