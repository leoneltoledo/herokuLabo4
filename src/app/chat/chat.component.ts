import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  listadoMensajes?: any[];

  constructor(private chatService:  ChatService) {
    this.chatService.getAll();
   }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('mensajes')));

  }



}
