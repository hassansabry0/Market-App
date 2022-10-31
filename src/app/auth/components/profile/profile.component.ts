import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  constructor(public AuthService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token-market')) {
      this.userData = this.AuthService.getUserData();
    }
  }
  goToCart(event: any) {
    //to remove sidebar
    event.target.offsetParent.firstElementChild.firstChild.click();
    if (event.target.innerHTML === 'LogOut') {
      this.AuthService.logOut();
      //change user icon
      event.path[7].children[2].children[0].children[0].children[0].children[0].classList.remove(
        'bi-people-fill'
      );
      event.path[7].children[2].children[0].children[0].children[0].children[0].classList.add(
        'bi-people'
      );

      event.path[7].children[0].children[0].children[0].children[2].children[0].children[1].classList.add(
        'remove'
      );
      event.path[7].children[0].children[0].children[0].children[2].children[0].children[1].classList.remove(
        'add'
      );
    }
    // if (event.target.innerHTML === 'My Cart') {
    //   this.AuthService.getUserCart('2').subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }
  }
}
