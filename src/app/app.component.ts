import { Component, OnInit } from '@angular/core';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isSignedIn = false;
  //user = JSON.parse(localStorage.getItem('user')).user.email;
  public user$: Observable<any> = this.authService.firebaseAuth.user;

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }

  async Logout(){
    await this.authService.logout();
    this.isSignedIn = false;
    this.router.navigate(['login']);
    console.log(this.isSignedIn);
  }
}
