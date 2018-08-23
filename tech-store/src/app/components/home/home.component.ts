import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // check if there is loged in user
    if (this.authService.isAuthenticated) {
      // get user's first part of email for greeting on home page
      this.userName = this.authService.getUserNameFromEmail();
    }
  }

}
