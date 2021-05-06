import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
    public user: string;

  constructor(private authService: AuthService,
     private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).user.email;
  }

  scores = [0, 0];
  weapons = [
      'piedra',
      'papel',
      'tijera'
  ]
  arma: string;
  arma2: string;
  playerSelected = -1;
  enemySelected = -1;
  loading = false;
  isResultShow = false;
  jugo: boolean = false;

  // result:   0 win
  //           1 lose
  //           2 tie
  result = 0
  

  pick(weapon: number): void {
      this.enemySelected = -1;
      if (this.loading) return;
      this.loading = true;
      this.playerSelected = weapon;
      this.jugo = true;

      if (this.playerSelected == 0)
          this.arma = "Piedra";
      else if (this.playerSelected == 1) 
          this.arma = "Papel";
      else 
          this.arma = "Tijera";
      
      //Timeout to simulate enemy's turn.
      setTimeout(() => {
          this.loading = false;
          //Generate a random number between 0 - 2 
          const randomNum = Math.floor(Math.random() * 3);
          this.enemySelected = randomNum;

          if (this.enemySelected == 0) 
              this.arma2 = "Piedra";
          else if (this.enemySelected == 1) 
              this.arma2 = "Papel";
          else 
              this.arma2 = "Tijera";
          
          this.checkResult();
          this.isResultShow = true;
      }, 2000);
  }

  checkResult(): void {
      const playerPick = this.playerSelected;
      const enemyPick = this.enemySelected;
      if (playerPick == enemyPick) {
          this.result = 2;
      }
      else if ((playerPick - enemyPick + 3) % 3 == 1) {
          // YOU WIN
          this.result = 0;
          this.scores[0] = this.scores[0] + 1;
          var date = new Date();
          this.dbService.saveResult({
            user: this.user,
            win: 1,
            lose: 0,
            createdAt: date.toLocaleDateString()
          }, 'ppt');
      }
      else {
          // YOU LOSE
          this.result = 1;
          this.scores[1] = this.scores[1] + 1;
          var date = new Date();
          this.dbService.saveResult({
            user: this.user,
            win: 0,
            lose: 1,
            createdAt: date.toLocaleDateString()
          }, 'ppt');
      }
  }

 


}
