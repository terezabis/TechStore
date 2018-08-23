import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SignInInputModel } from '../../../core/models/authentication/signin.input.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: SignInInputModel;

  constructor(private authService: AuthService) {
    this.model = new SignInInputModel("", "");
  }

  ngOnInit() {
  }

  signInn() {
    this.authService.signIn(this.model);
  }

}
