import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PhotoService } from 'src/app/services/photo.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
private images = [];
public imagesInact = '../../assets/memotest/informacion.png';
public cards: Array<any>;
private lastSelectId;
private requiredPositives = 8;
private positiveCounter: number;
public triesCounter: number;
public successMessage: string;
public list = [];
public usuarioLogueado: string;

constructor(
    private router: Router,
    private auth: AuthService,
    private photo: PhotoService,
    private dbService: DatabaseService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('user')).user.email;
 }

ngOnInit() {
    this.photo.getPhotos().subscribe(res => {
        console.log('Respuesta photos', res);
        this.list = res;
        this.setear();
        this.StartGame();
    });
}
public setear(){
    this.images = [
        { id: 1, url: this.list[0].urls.full },
        { id: 2, url: this.list[1].urls.full },
        { id: 3, url: this.list[2].urls.full },
        { id: 4, url: this.list[3].urls.full },
        { id: 5, url: this.list[4].urls.full },
        { id: 6, url: this.list[5].urls.full },
        { id: 7, url: this.list[6].urls.full },
        { id: 8, url: this.list[7].urls.full }
    ]
}

public StartGame() {
    this.cards = [];
    this.lastSelectId = null;
    this.positiveCounter = 0;
    this.triesCounter = 0;
    this.successMessage = '';
    let countIndex = 0;

    for (let i = 0; i < this.requiredPositives * 2; i++) {
        if (countIndex === this.requiredPositives) {
            countIndex = 0;
        }

        const img = this.images[countIndex];

        this.cards.push({
            id: img.id,
            url: img.url,
            visible: false,
            active: true,
        });
        countIndex++;
    }
    this.RandomArray(this.cards);
}

public CardSelected(idx) {
    if (!this.cards[idx].active) {
        return;
    }
    this.cards[idx].visible = true;

    if (this.lastSelectId == null) {
        this.lastSelectId = idx;
        this.cards[idx].visible = true;
        this.cards[idx].active = false;
    } else {
        if (this.cards[this.lastSelectId].id === this.cards[idx].id) {
            this.positiveCounter = this.positiveCounter + 1;
            this.cards[idx].visible = true;
            this.cards[idx].active = false;
            this.lastSelectId = null;
        } else {
            setTimeout(() => {
                this.cards[this.lastSelectId].visible = false;
                this.cards[this.lastSelectId].active = true;
                this.cards[idx].visible = false;
                this.lastSelectId = null;
            }, 0.5 * 3000);
        }
    }
    if (this.requiredPositives === this.positiveCounter) {
        this.successMessage = `Terminaste el juego en ${this.triesCounter} movimientos, sumaste: ${this.CargarPuntaje(this.triesCounter)} punto/s. ¿Jugás de Nuevo?`; 
        Swal.fire({
            icon: 'info',
            title: 'Lo lograste!!!',
            text: this.successMessage,
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            confirmButtonColor: '#311B92'   
        }).then((result) => {
            if (result.isConfirmed) {
                this.StartGame();
            } else {
                this.router.navigateByUrl('');
            }
        });
    }
    this.triesCounter++;
}

RandomArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temporaryValue;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

CargarPuntaje(puntaje: number) {
    let resultado = 0;
    
    if(puntaje < 26)
        resultado = 5;
    else if(puntaje > 25 && puntaje < 41)
        resultado = 3;
    else    
        resultado = 1;

    var date = new Date();
    this.dbService.saveResult({
        user: this.usuarioLogueado,
        partidas: 1,
        puntosAcumulados: resultado,
        createdAt: date.toLocaleDateString()
    }, 'memotest')

    return resultado;
}

}
