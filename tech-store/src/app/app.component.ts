import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBLmEjNNlSANh0UjpJfu16gol4nfuBf9gw',
      authDomain: "techstore-e9877.firebaseapp.com",
      databaseURL: "https://techstore-e9877.firebaseio.com",
      projectId: "techstore-e9877",
      storageBucket: "techstore-e9877.appspot.com",
      messagingSenderId: "1035920129464"
    })
  }


}
