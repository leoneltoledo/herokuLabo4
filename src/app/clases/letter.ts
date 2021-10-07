export class Letter{
    public letter:string;
    public guessed:boolean;
    public clicked:boolean;
    constructor(letter:string){
        this.letter = letter.toUpperCase();
        this.guessed = false;
        this.clicked = false;
    }
}