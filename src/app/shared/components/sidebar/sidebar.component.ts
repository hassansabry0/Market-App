import { AuthService } from './../../../auth/service/auth.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  auth: Boolean = false;
  email!: string;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.AuthService.userData.subscribe({
      next: () => {
        if (localStorage.getItem('token-market')) {
          //auth
          this.auth = true;
          console.log(this.auth);
        } else {
          //not auth
          this.auth = false;
          console.log(this.auth);
        }
      },
    });
  }

  getEmail(event: any) {
    this.email = event;
  }
}
