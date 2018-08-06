import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dropdownLi : string = "nav-item dropdown 01";
  dropdownMenu : string = "dropdown-menu 01";
  dropdownLi2 : string = "nav-item dropdown 02";
  dropdownMenu2 : string = "dropdown-menu 02";

  constructor(
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

  expand() {
    this.dropdownLi.endsWith('show') 
    ? this.dropdownLi = "nav-item dropdown 01" 
    : this.dropdownLi = "nav-item dropdown 01 show";

    this.dropdownMenu.endsWith('show')
    ? this.dropdownMenu = "dropdown-menu 01"
    : this.dropdownMenu = "dropdown-menu 01 show";
  }

  expand2() {
    this.dropdownLi2.endsWith('show') 
    ? this.dropdownLi2 = "nav-item dropdown 02" 
    : this.dropdownLi2 = "nav-item dropdown 02 show";

    this.dropdownMenu2.endsWith('show')
    ? this.dropdownMenu2 = "dropdown-menu 02"
    : this.dropdownMenu2 = "dropdown-menu 02 show";
  }
}
