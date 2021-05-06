import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  listadoMensajes?: any[];
  user: string;
  msg: string;
  

  constructor(private chatService:  ChatService, private router: Router) {
    this.chatService.getAll();
    this.user = JSON.parse(localStorage.getItem('user')).user.email;
    console.log(this.user);
    
   }

  ngOnInit(): void {
    this.chatService.getAll();
    
    this.listadoMensajes = JSON.parse(localStorage.getItem('mensajes'));
    if(this.listadoMensajes == null){
      setInterval(() => {
        if(!this.listadoMensajes){
          this.listadoMensajes = JSON.parse(localStorage.getItem('mensajes'));
          this.sortByDueDate();
          clearInterval();
        }
      }, 500);
    }
    else{
      this.listadoMensajes = JSON.parse(localStorage.getItem('mensajes'));
      this.sortByDueDate();
    }
  }

  newMsg(){
    this.chatService.saveMsg({
      usuario: this.user,
      hora: new Date().toLocaleString(),
      mensaje: this.msg
    });
    localStorage.removeItem('mensajes');
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['chat']);
    });
    
    
  }

  public compareDate(emp1, emp2) {  
    var emp1Date = new Date(emp1.hora).getTime();  
    var emp2Date = new Date(emp2.hora).getTime();  
    return emp1Date > emp2Date ? 1 : -1;    
  } 
  public sortByDueDate(): void {
    this.listadoMensajes = this.listadoMensajes.sort(this.compareDate);
  }

}
