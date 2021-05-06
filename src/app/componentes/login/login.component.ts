import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AuthService } from '../../services/auth.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  userCollection: AngularFirestoreCollection<Usuario>;
  userList: Array<Usuario>;
  isSignedIn;

  constructor(private router: Router,
    private authService: AuthService,
    private AppComponent: AppComponent) { }

  ngOnInit(): void {
  }

  async Onsignin(email:string, password:string){
    await this.authService.signin(email,password);
    if(this.authService.isLoggedIn){
      this.authService.saveLog({
        email: email,
        date: Date().toString()
      });
      console.log({
        email: email,
        date: Date().toString()
      });
      this.isSignedIn = true;
      this.router.navigate(['']);
      this.AppComponent.isSignedIn = true;
    }
    else{
      document.getElementById('errorBox').hidden = false;
    }
  }

  Login(){
    this.userCollection = this.authService.getAllUsers();
    this.userCollection.valueChanges()
      .subscribe(val => {
        this.userList = val
        console.log(this.userList);
        this.userList.forEach(u => {
        if(u.mail == this.usuario.mail && u.password == this.usuario.password){
          this.router.navigate(['']);
          console.log('Bienvenido: ' + u.mail);
        }
        else{
          this.router.navigate(['error']);
          console.log('Usuario Incorrecto');
        }
    });
      }); 
  }

  admin1(){
    this.usuario.mail = "leonel@admin.com";
    this.usuario.password = "asd123";
  }
  admin2(){
    this.usuario.mail = "profe@admin.com";
    this.usuario.password = "asd123";
  }
  
  
}
