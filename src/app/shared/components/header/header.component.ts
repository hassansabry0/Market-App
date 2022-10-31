import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../../auth/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  count: any = 0;
  auth!: boolean;
  constructor(private SharedService: SharedService) {}

  ngOnInit(): void {
    this.SharedService.getCount().subscribe((value) => {
      this.count = value ?? 0;
    });
    this.auth = localStorage.getItem('token-market') ? true : false;
  }
  goToCart() {}
}
