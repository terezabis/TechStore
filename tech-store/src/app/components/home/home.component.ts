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
    private authService : AuthService
  ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated){
      this.userName = this.authService.getUserNameFromEmail();
    }
  }

}
