import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Market-App';
  auth: Boolean = false;
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token-market')) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  }
}
