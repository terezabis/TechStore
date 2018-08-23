import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpInputModel } from '../models/authentication/signup.input.model';
import { SignInInputModel } from '../models/authentication/signin.input.model';

const adminUids = ["vvQOPft74OQyALxXMNRu8xwzVwW2"];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  name: string;

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  // register new user
  signUp(body: SignUpInputModel) {
    firebase.auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then((data) => {
        this.toastr.success('Signed Up', 'Success');
        this.router.navigate(['/signin']);
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Warning');
      });
  }

  // sign in in application
  signIn(body: SignInInputModel) {
    firebase.auth()
      .signInWithEmailAndPassword(body.email, body.password)
      .then((data) => {
        firebase.auth()
          .currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
          })

        this.router.navigate(['/home']);
        this.toastr.success('Logged In', 'Success');
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Warning');
      });
  }

  // logout from the application
  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.router.navigate(['/signin']);
        this.token = null;
        this.toastr.success('Logged out', 'Success');
      });
  }

  // get token for authentication
  getToken() {
    firebase.auth()
      .currentUser
      .getIdToken()
      .then((token: string) => {
        this.token = token;
      })

    return this.token;
  }

  // check if user is loged in
  isAuthenticated(): boolean {
    return this.token != null;
  }

  // check if loged in user is in role 'Admin'
  isAdmin() {
    if (firebase.auth().currentUser) {
      let currentUserUid = firebase.auth().currentUser.uid;
      if (adminUids.lastIndexOf(currentUserUid) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // get first part from current user's email
  getUserNameFromEmail() {
    if (firebase.auth().currentUser) {
      let userEmail = firebase.auth().currentUser.email;
      this.name = userEmail.substring(0, userEmail.lastIndexOf("@"));
      return this.name;
    }
  }

}
