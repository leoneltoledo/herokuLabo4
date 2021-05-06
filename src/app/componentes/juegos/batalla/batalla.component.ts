import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Ship } from 'src/app/clases/ship';
import { ShipRandom } from 'src/app/clases/shipRandom';
import { DatabaseService } from 'src/app/services/database.service';
import Swal  from 'sweetalert2';

const sizeShip = [5, 4, 3, 2];
const positionArray = ["horizontal", "vertical"]

var ship = new Ship();
var shipRandom = new ShipRandom();
var matrix = [];
var quantityShip = [1, 1, 1, 2];
var matrixAttack = [];





@Component({
  selector: 'app-batalla',
  templateUrl: './batalla.component.html',
  styleUrls: ['./batalla.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BatallaComponent implements OnInit {
  
  public quantityShipPC =  [1, 1, 1, 2];
  public board: HTMLElement;
  public boardAttack: HTMLElement;
  public position: HTMLCollectionOf<any>;
  public usuarioLogueado: string;

  constructor(private dbService: DatabaseService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user')).user.email;
  }

  ngOnInit(): void {
    //Creación de tablero jugador
    this.board = document.getElementById("board");
    this.createMatrix(this.board, matrix, this.selectPosition, "player");
    this.position = document.getElementsByClassName('position');
    this.createShips();
  }

  //Función para creación de tableros
  public createMatrix(boardType, matrixType, func, type){
    for(var i=0; i<10; i++){
      var list = [];
      var row = document.createElement("div");
      boardType.appendChild(row);
      row.className = "myRow"
      for(var j=0; j<10; j++){
        var grid = document.createElement("div");
        row.appendChild(grid);
        grid.className = "grid";
        grid.id = i + "," + j + "," + type;
        grid.addEventListener("click", func);
        list.push("");
      }
      matrixType.push(list);
    }
  }

  //Función para seleccionar barco
  public selectShip(event){
    var shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
  }

  //Creación de barcos
  public createShips(){
    for(var i=0; i<this.position.length; i++){
      var horizontal = document.createElement("div");
      this.position[i].appendChild(horizontal);
      horizontal.className = "horizontal " + i;
      horizontal.addEventListener("click", this.selectShip)
      var vertical = document.createElement("div");
      this.position[i].appendChild(vertical);
      vertical.className = "vertical " + i;
      vertical.addEventListener("click", this.selectShip);
    }
  }

  //Función para seleccionar posición de los barcos
  public selectPosition(event){
    if(ship.quantity > 0){
      let grid = event.target
      let gridID = grid.id.split(",");
      let x = parseInt(gridID[0]);
      let y = parseInt(gridID[1]);
      if(ship.position === "horizontal"){
        if((y + (ship.size - 1)) < 10){
          for(let i=y; i<(y + ship.size); i++){
            matrix[x][i] = "ship";
            document.getElementById(x + "," + i + "," + "player").className += " selected";
          }
          quantityShip[ship.id] -= 1;
          ship = {position: '',
          size: 0,
          quantity: 0,
          id: ''}
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Selecciona una posición válida',
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            confirmButtonColor: '#311B92'   
          });
        }
      }
      else if(ship.position === "vertical"){
        if((x + (ship.size - 1)) < 10){
          for(let i=x; i<(x + ship.size); i++){
            matrix[i][y] = "ship";
              document.getElementById(i + "," + y + "," + "player").className += " selected";
          }
          quantityShip[ship.id] -= 1;
          ship = {position: '',
          size: 0,
          quantity: 0,
          id: ''}
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Selecciona una posición válida',
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            confirmButtonColor: '#311B92'   
          });
        }
      }
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar un barco disponible',
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#311B92'   
      });
    }
  }
  //Función de botón iniciar juego
  public startGame(){
    //Validar que se hayan colocados todos los barcos
    this.boardAttack = document.getElementById("boardAttack");
    this.createMatrix(this.boardAttack, matrixAttack, this.checkShot, "pc");
    this.selectPositionRandom();
    document.getElementById("button").hidden = true; //Si empieza otra partida volver a habilitarlo
  }

  //Generar posición random de barcos
  public selectPositionRandom(){
    for(let i=0; i<this.quantityShipPC.length; i++){
        while(this.quantityShipPC[i] > 0){
            this.random(i);
            this.quantityShipPC[i] -= 1;
        }
    }
  }

  //Verificación de posición válida
  public checkPosition(pos, axis, size){
    if(shipRandom.position  === pos){
        if((axis + (size - 1)) < 10){
            return true;
        }
        else{
            return false;
        }
    }
  }

  //Función para crear barco random
  public random(i){
    shipRandom.position = positionArray[Math.floor(Math.random() * Math.floor(positionArray.length))];
    shipRandom.x = Math.floor(Math.random() * Math.floor(10));
    shipRandom.y = Math.floor(Math.random() * Math.floor(10));
    if(this.checkPosition("horizontal", shipRandom.y, sizeShip[i])){
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            if(matrixAttack[shipRandom.x][j] === "ship"){
                return this.random(i)
            }
        }
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
          matrixAttack[shipRandom.x][j] = "ship";
        }
    }
    else if(this.checkPosition("vertical", shipRandom.x, sizeShip[i])){
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            if(matrixAttack[j][shipRandom.y] === "ship"){
                return this.random(i)
            }
        }
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
          matrixAttack[j][shipRandom.y] = "ship";
        }
    }
    else{
        return this.random(i)
    }
  }

  //Verificar tiro de jugador
  public checkShot = (event) => {
    let grid = event.target
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if(matrixAttack[x][y] === "ship"){

        Swal.fire({
          title: 'Jugada',
          text: 'Muy bien, acertaste. Vuelve a jugar',
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#311B92'   
        }).then(() => {
          matrixAttack[x][y] = "hit";
          document.getElementById(x + "," + y + "," + "pc").className += " hit";
          this.checkWinner(matrixAttack, "player");
        });
        

    }
    else{
        Swal.fire({
          title: 'Jugada',
          text: 'Mal! tu disparo cayó al agua',
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#311B92'   
        }).then(() => {
          matrixAttack[x][y] = "miss";
            document.getElementById(x + "," + y + "," + "pc").className += " miss";
            this.shotPc();
      });
    }
  }
  //Jugada del PC
  public shotPc(){
    let x = Math.floor(Math.random() * Math.floor(10));
    let y = Math.floor(Math.random() * Math.floor(10));
    if(matrix[x][y] === "ship"){
        Swal.fire({
          title: 'Jugada',
          text: 'Ops! te han disparado',
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#311B92'   
        }).then(() => {
          matrix[x][y] = "hit";
          document.getElementById(x + "," + y + "," + "player").className += " hit";
          this.checkWinner(matrix, "pc");
          return this.shotPc();
        }); 
    }
    else if(matrix[x][y] === "hit" || matrix[x][y] === "miss"){
        return this.shotPc();
    }
    else{
        Swal.fire({
          title: 'Jugada',
          text: 'El disparo del pc cayó al agua',
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#311B92'   
        });
        matrix[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "player").className += " miss";
    }
  }

  //Revisar ganador
  public checkWinner(matrix, player){
    for(let i=0; i<10; i++){
        let arraychecked = matrix[i].filter((index)=>{return index === "ship"})
        if(arraychecked.length > 0){
            return
        }
    }
    if(player === "pc"){
      Swal.fire({
        title: 'Final',
        text: 'Ha ganado el PC',
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#311B92'   
      });
      var date = new Date();
      this.dbService.saveResult({
        user: this.usuarioLogueado,
        win: 0,
        lose: 1,
        createdAt: date.toLocaleDateString()
      }, 'batalla')
    }
    else{
        Swal.fire({
          title: 'Final',
          text: 'GANASTE!!!',
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#311B92'   
        });
        var date = new Date();
        this.dbService.saveResult({
          user: this.usuarioLogueado,
          win: 1,
          lose: 0,
          createdAt: date.toLocaleDateString()
        }, 'batalla');
        
    }
  }

}





  


