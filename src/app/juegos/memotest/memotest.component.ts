import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  private images = [
    { id: 1, url: '../../assets/memotest/001-facebook.png' },
    { id: 2, url: '../../assets/memotest/002-twitter.png' },
    { id: 3, url: '../../assets/memotest/003-instagram.png' },
    { id: 4, url: '../../assets/memotest/004-linkedin.png' },
    { id: 5, url: '../../assets/memotest/005-pinterest.png' },
    { id: 6, url: '../../assets/memotest/006-google-plus.png' },
    { id: 7, url: '../../assets/memotest/007-tumblr.png' },
    { id: 8, url: '../../assets/memotest/008-flickr.png' },
];
public imagesInact = '../../assets/memotest/informacion.png';
public cards: Array<any>;
private lastSelectId;
private requiredPositives = 8;
private positiveCounter: number;
public triesCounter: number;
public successMessage: string;

constructor(private router: Router, private auth: AuthService) { }

ngOnInit() {
    this.StartGame();
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
            }, 0.5 * 1000);
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
                this.router.navigateByUrl('/Principal');
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

    //this.auth.SetPuntajeMemotest(resultado);

    return resultado;
}

}
