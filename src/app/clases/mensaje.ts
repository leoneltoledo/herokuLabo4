import { Usuario } from "./usuario";

export class Mensaje {
    id: string = '';
    mensaje: string = '';
    usuario: Usuario = new Usuario();  
    hora: string = '';

    constructor(){}     
}