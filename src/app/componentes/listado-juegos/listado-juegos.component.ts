import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-listado-juegos',
  templateUrl: './listado-juegos.component.html',
  styleUrls: ['./listado-juegos.component.css']
})
export class ListadoJuegosComponent implements OnInit {
  public pptResult: Array<any> = new Array();
  public tatetiResult: Array<any> = new Array();
  public batallaResult: Array<any> = new Array();
  public memotestResult: Array<any> = new Array();
  public preguntadosResult: Array<any> = new Array();
  public ahorcadoResult: Array<any> = new Array();
  public mayorMenorResult: Array<any> = new Array();
  public listadoPpt: Array<any>;
  public listadoTateti: Array<any>;
  public listadoBatalla: Array<any>;
  public listadoMemo: Array<any>;
  public listadoPreguntados: Array<any>;
  public listadoAhorcado: Array<any>;
  public listadoMayorMenor: Array<any>;

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.dbService.getResults("ppt")
      .then(result => {
          this.listadoPpt = result;
          this.listadoPpt.forEach(res => {
            var newPlayer = true;
            if(!this.pptResult.length){
              this.pptResult.push(res); 
            }
            else{
              this.pptResult.forEach(r => {
                if(r.user == res.user){
                  if(res.win == 1){
                    r.win += 1;
                  }
                  if(res.lose == 1){
                    r.lose += 1;
                  } 
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.pptResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.pptResult.push(res);
                }
              });
            }
            
          });
      })
      
    this.dbService.getResults("tateti")
      .then(result => {
          this.listadoTateti = result;
          this.listadoTateti.forEach(res => {
            var newPlayer = true;
            if(!this.tatetiResult.length){
              this.tatetiResult.push(res); 
            }
            else{
              this.tatetiResult.forEach(r => {
                if(r.user == res.user){
                  if(res.win == 1){
                    r.win += 1;
                  }
                  if(res.lose == 1){
                    r.lose += 1;
                  } 
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.tatetiResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.tatetiResult.push(res);
                }
              });
            }
            
          });
      })

    this.dbService.getResults("batalla")
      .then(result => {
          this.listadoBatalla = result;
          this.listadoBatalla.forEach(res => {
            var newPlayer = true;
            if(!this.batallaResult.length){
              this.batallaResult.push(res); 
            }
            else{
              this.batallaResult.forEach(r => {
                if(r.user == res.user){
                  if(res.win == 1){
                    r.win += 1;
                  }
                  if(res.lose == 1){
                    r.lose += 1;
                  } 
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.batallaResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.batallaResult.push(res);
                }
              });
            }
            
          });
      })

    this.dbService.getResults("memotest")
      .then(result => {
          this.listadoMemo = result;
          this.listadoMemo.forEach(res => {
            var newPlayer = true;
            if(!this.memotestResult.length){
              this.memotestResult.push(res); 
            }
            else{
              this.memotestResult.forEach(r => {
                if(r.user == res.user){
                  r.partidas += res.partidas;
                  r.puntosAcumulados += res.puntosAcumulados;
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.memotestResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.memotestResult.push(res);
                }
              });
            }
            
          });
      })

      this.dbService.getResults("preguntados")
      .then(result => {
          this.listadoPreguntados = result;
          this.listadoPreguntados.forEach(res => {
            var newPlayer = true;
            if(!this.preguntadosResult.length){
              this.preguntadosResult.push(res); 
            }
            else{
              this.preguntadosResult.forEach(r => {
                if(r.user == res.user){
                  r.partidas += res.partidas;
                  r.puntosAcumulados += res.puntosAcumulados;
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.preguntadosResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.preguntadosResult.push(res);
                }
              });
            }
            
          });
      })

      this.dbService.getResults("ahorcado")
      .then(result => {
          this.listadoAhorcado = result;
          this.listadoAhorcado.forEach(res => {
            var newPlayer = true;
            if(!this.ahorcadoResult.length){
              this.ahorcadoResult.push(res); 
            }
            else{
              this.ahorcadoResult.forEach(r => {
                if(r.user == res.user){
                  r.partidas += res.partidas;
                  r.puntosAcumulados += res.puntosAcumulados;
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.ahorcadoResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.ahorcadoResult.push(res);
                }
              });
            }
            
          });
      })

      this.dbService.getResults("mayormenor")
      .then(result => {
          this.listadoMayorMenor = result;
          this.listadoMayorMenor.forEach(res => {
            var newPlayer = true;
            if(!this.mayorMenorResult.length){
              this.mayorMenorResult.push(res); 
            }
            else{
              this.mayorMenorResult.forEach(r => {
                if(r.user == res.user){
                  r.partidas += res.partidas;
                  r.puntosAcumulados += res.puntosAcumulados;
                  if(res.createdAt > r.createdAt){
                    r.createdAt = res.createdAt;
                  }  
                }
                else{
                  this.mayorMenorResult.forEach(result => {
                    if(result.user == res.user){
                      newPlayer = false;
                    }
                  });
                  if(newPlayer)
                    this.mayorMenorResult.push(res);
                }
              });
            }
            
          });
      })

  }

  




}
