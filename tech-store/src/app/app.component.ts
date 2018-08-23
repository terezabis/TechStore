import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    // firebase inirialization for back-end
    firebase.initializeApp({
      apiKey: 'AIzaSyBLmEjNNlSANh0UjpJfu16gol4nfuBf9gw',
      authDomain: "techstore-e9877.firebaseapp.com"
    })
  }
}
