import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service'
import { SignUpInputModel } from '../../../core/models/authentication/signup.input.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: SignUpInputModel;

  constructor(private authService: AuthService) {
    this.model = new SignUpInputModel("", "");
  }

  ngOnInit() {
  }

  signUpp() {
    this.authService.signUp(this.model);
  }

}
