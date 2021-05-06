import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbSurveys = 'encuestas';
  private dbPpt = 'ppt';
  private dbTateti = 'tateti';
  private dbMemotest = 'memotest';
  private dbBatalla = 'batalla';
  surveyList: AngularFirestoreCollection<any>;
  tatetiList: AngularFirestoreCollection<any>;
  pptList: AngularFirestoreCollection<any>;
  memotestList: AngularFirestoreCollection<any>;
  batallaList: AngularFirestoreCollection<any>;
  user: string;

  constructor(private db: AngularFirestore,  private afs: AngularFirestore) {
    this.surveyList = db.collection(this.dbSurveys);
    this.tatetiList = db.collection(this.dbTateti);
    this.pptList = db.collection(this.dbPpt);
    this.memotestList = db.collection(this.dbMemotest);
    this.batallaList = db.collection(this.dbBatalla);
    this.user = JSON.parse(localStorage.getItem('user')).user.email;
   }

  saveSurvey(survey: any): any{
    console.log('Encuesta guardada');
    return this.surveyList.add({...survey});
  }

  saveResult(result: any, juego: string): any{
    switch(juego) { 
      case 'ppt': { 
        console.log('Resultado guardado');
        return this.pptList.add({...result}); 
      } 
      case 'memotest': { 
        console.log('Resultado guardado');
        return this.memotestList.add({...result});
      } 
      case 'batalla': { 
        console.log('Resultado guardado');
        return this.batallaList.add({...result});
      } 
      case 'tateti': { 
        console.log('Resultado guardado');
        return this.tatetiList.add({...result});
      } 
    } 
  }

  getResults(juego) {
    return new Promise<any>((resolve, reject) => {
        this.db.collection(`${juego}`).valueChanges().subscribe(snapshots => {
            resolve(snapshots)
        })
    })
  }

}
