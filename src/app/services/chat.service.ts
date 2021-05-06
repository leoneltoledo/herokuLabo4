import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/clases/mensaje';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dbpath = '/mensajes'; //nombre de la coleccion que creara para los documentos
  chatCollection: AngularFirestoreCollection<any>;
  chatList: any[];
  constructor(private db: AngularFirestore) {
    this.chatCollection = db.collection(this.dbpath);
   }

  getAll() {
    this.chatCollection.valueChanges()
      .subscribe(val => {
        localStorage.setItem('mensajes', JSON.stringify(val))
      });
  }

  saveMsg(msg: any): any{
    console.log('Mensaje guardado: ' + msg.mensaje);
    return this.chatCollection.add({...msg});
  }
}
