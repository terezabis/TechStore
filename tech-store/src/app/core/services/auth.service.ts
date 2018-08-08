import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string;
  name : string;

  constructor(
    private toastr : ToastrService,
    private router : Router
  ) { }

  signUp(email: string, password : string) {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.toastr.success('Signed Up', 'Success');
        this.router.navigate(['/signin']);
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Warning');
      });
  }

  signIn(email : string, password : string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        firebase.auth()
          .currentUser
          .getIdToken()
          .then((token : string) => {
            this.token = token;
          })

          this.router.navigate(['/home']);
          this.toastr.success('Logged In', 'Success');
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Warning');
      });
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.router.navigate(['/signin']);
        this.token = null;
        this.toastr.success('Logged out', 'Success');
      });
  }

  getToken() {
    firebase.auth()
    .currentUser
    .getIdToken()
    .then((token : string) => {
      this.token = token;
    })

    return this.token;
  }

  isAuthenticated() : boolean {
    return this.token != null;
  }

  getUserNameFromEmail() {
    let userEmail = firebase.auth().currentUser.email;
    console.log(userEmail);
    this.name = userEmail.substring(0, userEmail.lastIndexOf("@"));
    console.log(this.name);
    return this.name;
  }

}
