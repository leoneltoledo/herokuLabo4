import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edades',
  templateUrl: './edades.component.html',
  styleUrls: ['./edades.component.css']
})
export class EdadesComponent implements OnInit {

  constructor() { }
  edadUno:number;
  edadDos:number;
  suma:number;
  promedio:number;

  limpiar(){
    this.edadUno = null;
    this.edadDos = null;
    document.getElementById('resultado').hidden=true;
  }

  calcular(){
    this.suma = this.edadUno + this.edadDos;
    this.promedio = this.suma/2;

    document.getElementById('resultado').hidden=false;
  }

  ngOnInit(): void {
  }

}
