import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUsers = 'usuarios';
  private dbLogs = 'ingresos';
  userList: AngularFirestoreCollection<Usuario>;
  logsList: AngularFirestoreCollection<any>;
  isLoggedIn = false;

  constructor(private db: AngularFirestore,
    public firebaseAuth: AngularFireAuth) { 
      this.userList = db.collection(this.dbUsers);
      this.logsList = db.collection(this.dbLogs);
  }

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res))
      }, rej => {})
  }

  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res))
      }, rej => {})
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getAllUsers(): AngularFirestoreCollection<Usuario>{
    return this.userList;
  }

  create(usuario: Usuario): any{
    console.log('Usuario creado');
    return this.userList.add({...usuario});
  }

  saveLog(log: any): any{
    console.log('Log guardado');
    return this.logsList.add({...log});
  }
  
}