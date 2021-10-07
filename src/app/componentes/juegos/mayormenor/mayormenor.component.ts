import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {
  public reset = false;
  public points = 0;
  public usuarioLogueado: string;
  public img: string = "../../../../assets/cartas/02.webp";
  public oldCard: string;
  public imgList:string[] = ['../../../../assets/cartas/02.webp','../../../../assets/cartas/03.webp','../../../../assets/cartas/04.png','../../../../assets/cartas/05.webp','../../../../assets/cartas/06.png','../../../../assets/cartas/07.png','../../../../assets/cartas/09.webp','../../../../assets/cartas/10.webp','../../../../assets/cartas/11.webp','../../../../assets/cartas/12.webp','../../../../assets/cartas/13.png','../../../../assets/cartas/14.webp'];

  constructor(private router:Router, private auth:AuthService, private db:DatabaseService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user')).user.email;
  }

  ngOnInit(): void {
  }

  Bigger(){//Sacar nueva carta y comprar si es menor o mayor, en el caso de acertar o igualar continua y sino pierde
    var randomNum = Math.floor(Math.random() * (this.imgList.length - 0)) + 0;
    var imgAux = this.imgList[randomNum];
    this.oldCard = this.img;
    this.ChangeCard(imgAux);
    
    if(this.oldCard<imgAux){
      //gano
      this.points++;
      Swal.fire({
        text: 'Acertaste!',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
    }
    else if(this.oldCard == imgAux){
      Swal.fire({
        text: 'Igualada',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
    }
    else{
      //perdio
      Swal.fire({
        text: 'Perdiste!',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
      this.reset = true;
    }
    
  }

  Smaller(){
    var randomNum = Math.floor(Math.random() * (this.imgList.length - 0)) + 0;
    var imgAux = this.imgList[randomNum];
    this.oldCard = this.img;
    this.ChangeCard(imgAux);

    if(this.oldCard>imgAux){
      //gano
      this.points++;
      Swal.fire({
        text: 'Acertaste!',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
    }
    else if(this.oldCard == imgAux){
      Swal.fire({
        text: 'Igualada',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
    }
    else{
      //perdio
      Swal.fire({
        text: 'Perdiste!',
        confirmButtonText: `Continuar`,
        confirmButtonColor: '#311B92'   
      });
      this.reset = true;
    }
  }

  ChangeCard(imgAux:string){
    this.img = imgAux;
  }

  ResetGame(){
    this.Save();
    this.reset = false;
    this.points = 0;
    //this.StartGame();
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
    }, 'mayormenor')
  }
}
