import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  public usuarioLogueado: string;
  public reset = false;
  public points = 0;
  public questionsList:any[] = [{question: '¿Quien ganó la última Copa America?', choice1: 'Brasil', choice2: 'Chile', choice3: 'Uruguay', choice4: 'Argentina', correct: 'Argentina'}, {question: '¿Cuantos eran los mandamientos?', choice1: '15', choice2: '10', choice3: '11', choice4: '20', correct:'10'}, {question: '¿Que país fue sacudido en 2010 por un terremoto de grado 7?', choice1: 'Haití', choice2: 'Chile', choice3: 'México', choice4: 'Argentina', correct:'Haití'}, {question: '¿Cómo se dice en inglés auto?', choice1: 'Cat', choice2: 'Bike', choice3: 'Car', choice4: 'Day', correct: 'Car'}, {question: '¿Cómo se llama Colon?', choice1: 'Cristóbal', choice2: 'Manuel', choice3: 'Eduardo', choice4: 'Luis', correct: 'Cristóbal'}, {question: '¿Quién es el vecino de los simpsons?', choice1: 'Apu', choice2: 'Ned Flanders', choice3: 'Gordo Tony', choice4: 'El profesor Skinner', correct: 'Ned Flanders'}, {question: '¿En que país esta el obelisco?', choice1: 'Brasil', choice2: 'España', choice3: 'Argentina', choice4: 'Chile', correct: 'Argentina'}, {question: '¿En que museo se encuentra la obra de Leonardo Da Vinci, La Mona Lisa?', choice1: 'Del Louvre', choice2: 'Del Prado', choice3: 'Metropolitan Museum of Art', choice4: 'Del Cairo', correct: 'Del Louvre'}, {question: '¿Donde queda situada la provincia de misiones?', choice1: 'Paraguay', choice2: 'Chile', choice3: 'Uruguay', choice4: 'Argentina', correct: 'Argentina'} ];
  public question: any;
  public index: number = 0;

  constructor(private router:Router, private auth:AuthService, private db:DatabaseService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user')).user.email;
  }

  ngOnInit(): void {
    this.question = this.questionsList[this.index];
  }

  ValidateAnswer(answer:string){
    if(this.question.correct == answer){
      //acertó la pregunta
      if(this.index >= 0){
        Swal.fire({
          text: 'Respuesta correcta!',
          confirmButtonText: `Continuar`,
          confirmButtonColor: '#311B92'   
        });
        this.ChangeQuestion();
        this.points++;
      } 
    }
    else{
      //se confundió
      if(this.index >= 0){
        Swal.fire({
          text: 'Respuesta equivocada!',
          confirmButtonText: `Continuar`,
          confirmButtonColor: '#311B92'   
        });
        this.ChangeQuestion();
        this.points--;
      }
    }
  }

  ChangeQuestion(){
    if(this.index < 8){
      this.index++;
      this.question = this.questionsList[this.index];
    }
    else{
      this.index = -1;
      this.reset = true;
    }
  }

  ResetGame(){
    this.Save();
    this.reset = false;
    this.points = 0;
    this.index = 0;
    this.question = this.questionsList[this.index];
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
    }, 'preguntados')
  }
}
