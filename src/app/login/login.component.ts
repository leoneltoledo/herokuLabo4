import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }
  nombre:string;
  clave:string;

  ngOnInit(): void {
  }
  
  login(){
    if(this.nombre == "admin" && this.clave == "admin"){
      this.router.navigate(['bienvenido']);
    }else{
      this.router.navigate(['error']);
    }
  }
}
