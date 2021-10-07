import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Letter } from 'src/app/clases/letter';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  public letters1:string[] = ['A','B','C','D','E','F','G','H','I'];
  public letters2:string[] = ['J','K','L','M','N','Ñ','O','P','Q'];
  public letters3:string[] = ['R','S','T','U','V','W','X','Y','Z'];
  public wordsList:string[] = ['universidad','profesor','futbol','natacion','calamar','hamaca','trampolin','escalera','emocion','casa','mañana','verano'];
  public word:Array<Letter> = new Array<Letter>();
  public gameStarted = false;
  public reset = false;
  public errors;
  public points = 0;
  public totalPoints;
  public usuarioLogueado: string;
  
  constructor(private router:Router, private auth:AuthService, private db:DatabaseService){
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user')).user.email;
  }

  ngOnInit(){
    this.StartGame();
  }

  StartGame(){
    this.errors = 0;
    var randomNum = Math.floor(Math.random() * (this.wordsList.length - 0)) + 0;
    var wordAux = this.wordsList[randomNum];
    //this.SetWord("hamaca");
    var index = this.wordsList.findIndex(a => a == wordAux);
    if (index != -1){
      this.wordsList.splice(index, 1);
    }
    this.SetWord(wordAux);
    this.gameStarted = true;
    this.CheckErrors();
  }

  SetWord(word:string){
    this.totalPoints = word.length;
    for(var i = 0; i < this.totalPoints; i++){
      this.word.push(new Letter(word[i]));
    }
  }

  ValidateLetter(letter:string){
    if(this.errors < 6) {
      var index = this.word.findIndex(aux => aux.letter.toUpperCase() == letter && aux.guessed == false);
      if (index == -1){
        this.errors++;
        this.CheckErrors();
        console.log(this.errors);
      }
      else{
        this.word[index].guessed = true;
        if (this.ValidateWin()){
          this.points = this.points + this.totalPoints;
          this.reset = true;
        }
        else
          this.ValidateLetterAgain(letter);
      }
    }
  }

  ValidateWin():boolean{
    for (var i = 0; i < this.word.length; i++){      
        if(this.word[i].guessed == false)
          return false;
    }
    return true;
  }

  ValidateLetterAgain(letter:string){
    var index = this.word.findIndex(aux => aux.letter.toUpperCase() == letter && aux.guessed == false);
    if (index != -1){
      this.word[index].guessed = true;
      this.ValidateLetterAgain(letter);
    }
  }

  CheckErrors(){
    if (this.errors == 6){
      this.points = this.points - this.totalPoints;
      this.reset = true;
    }  
  }

  ResetGame(){
    this.Save();
    this.reset = false;
    this.errors = 0;
    this.totalPoints = 0;
    this.points = 0;
    this.word = [];
    this.gameStarted = true;
    this.StartGame();
  }

  LeaveGame(){
    this.Save();
    this.router.navigateByUrl('');
  }
  
  Save(){
    var date = new Date();
    this.db.saveResult({
        user: this.usuarioLogueado,
        partidas: 1,
        puntosAcumulados: this.points,
        createdAt: date.toLocaleDateString()
    }, 'ahorcado')
  }

}