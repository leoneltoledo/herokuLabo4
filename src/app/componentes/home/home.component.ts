import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn = false;

  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null) {
      this.AuthService.isLoggedIn = true;
      this.isSignedIn = true;
    } 
    else {
      this.AuthService.isLoggedIn = false;
      this.isSignedIn = false;
    }
      
  }
}
