import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: Usuario = new Usuario();
  title = 'firebase-angular-auth';
  isSignedIn = false;

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }

  async OnSignup(email:string, password:string){
    await this.authService.signup(email,password);

    if(this.authService.isLoggedIn){
      this.isSignedIn = true;
      this.router.navigate(['']);
    }
    else{
      document.getElementById('errorBox').hidden = false;
    }
  }

  async Onsignin(email:string, password:string){
    await this.authService.signin(email,password);
    if(this.authService.isLoggedIn)
      this.authService.saveLog({
        email: email,
        date: Date.now()
      });
      console.log({
        email: email,
        date: Date.now()
      });
      this.isSignedIn = true;
      this.router.navigate(['']);
  }

  CreateUser(){
    this.authService.create(this.usuario);
    console.log(this.usuario);
  }

}
